import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../servicios/usuarios.service';
import { UtilService } from '../../servicios/util.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  @Input() objPerfil: any;
  pathLogo;
  pathImagen
  logoURL: any;
  imgURL: any;
  formulario: FormGroup;
  control: boolean;
  uploadPercentImagen: Observable<number>
  uploadPercentDosier: Observable<number>
  imagenO: any;
  logoO: any;
  botonActivo: boolean;


  constructor(private storage: AngularFireStorage, private usuariosService: UsuariosService, private router: Router, private activatedRoute: ActivatedRoute, private utilService: UtilService) {
    this.logoURL = ''
    this.imgURL = ''
    this.control = false;
    this.botonActivo = false;
  }

  ngOnInit() {
    console.log(this.objPerfil.nombre)
    this.logoURL = this.objPerfil.logo;
    this.imgURL = this.objPerfil.imagen;
    this.formulario = new FormGroup({
      nombre: new FormControl(this.objPerfil.nombre, [
      ]),
      imagen: new FormControl('', [
      ]),
      logo: new FormControl('', [
      ]),
      activado: new FormControl(this.objPerfil.activado, [
      ])
    })
  }
  onChangeLogo(e, files) {
    // console.log('LOGO ', files)
    if (files.length === 0)
      return;
    var reader = new FileReader();
    // this.pathLogo = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.logoURL = reader.result;
    }
    this.logoO = e.target.files[0];
  }

  onChangeImg(e, files2) {
    // console.log('IMG ', files2)
    if (files2.length === 0)
      return;
    var reader = new FileReader();
    reader.readAsDataURL(files2[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
    this.imagenO = e.target.files[0];
  }

  subirImagen(valImg, tipo) {
    console.log(valImg)
    if (valImg) {
      const filePath = 'imagenes/' + valImg.name;
      const fileRef = this.storage.ref(filePath);
      const tarea = this.storage.upload(filePath, valImg);
      tarea.percentageChanges().subscribe(percent => {
        console.log(percent)
      })
      this.uploadPercentImagen = tarea.percentageChanges();

      tarea.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            console.log('URL: ', url);
            if (tipo == 'imagen') {
              this.formulario.value.imagen = url;
              this.formulario['imagen'] = filePath;
            } else if (tipo == 'logo') {
              this.formulario.value.logo = url;
              this.formulario['logo'] = filePath;
            }
          })
        })
      ).subscribe()
    }
  }
  async tratarSubmit() {

    if (!this.formulario.valid) {
      this.control = true;
    } else {
      this.control = false;
      this.formulario.value.idUsuario = this.objPerfil['fk_usuario'];
      this.formulario.value.imagen = this.objPerfil.imagen;
      this.formulario.value.logo = this.objPerfil.logo;
      await this.subirImagen(this.imagenO, 'imagen');
      await this.subirImagen(this.logoO, 'logo');
      this.botonActivo = true;
      setTimeout(() => {
        this.enviarFormulario()
      }, 5000);
    }
  }
  enviarFormulario() {
    try {

      if (this.objPerfil['fk_usuario'] == 0) {
        this.formulario.value.idUsuario = parseInt(this.utilService.getIdUsuario())
        this.usuariosService.addPerfil(this.formulario.value);
      } else {
        this.usuariosService.updPerfil(this.formulario.value);
      }
      console.log(this.formulario.value);
    } catch (err) {
      console.log(err)
    }
    this.router.navigate(['/cerrar']);
  }

}
