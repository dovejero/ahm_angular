import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../servicios/usuarios.service';

import { NgRedux, NgReduxModule, select } from '@angular-redux/store';
import { IAppState, rootReducer } from '../../store/store';
import { INCREMENT, UPDATE_LOGIN } from '../../store/actions';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  @Input() idUsuario: number;
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


  constructor(private storage: AngularFireStorage, private usuariosService: UsuariosService, private router: Router, private activatedRoute: ActivatedRoute, private ngRedux: NgRedux<IAppState>) {
    this.logoURL = "https://image.flaticon.com/icons/svg/15/15081.svg"
    this.imgURL = "http://pluspng.com/img-png/music-band-png-hd-bands-1200.jpg"
    this.control = false;
    this.botonActivo = false;
    this.formulario = new FormGroup({
      nombre: new FormControl('', [
      ]),
      imagen: new FormControl('', [
      ]),
      logo: new FormControl('', [
      ]),
      activado: new FormControl(false, [
      ])
    })
  }

  ngOnInit() {
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
      this.formulario.value.idUsuario = this.idUsuario;
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
      this.usuariosService.addPerfil(this.formulario.value);
      console.log(this.formulario.value);
    } catch (err) {
      console.log(err)
    }
    this.router.navigate(
      [
        "/cerrar",
        {
          outlets: {
            chat: null
          }
        }
      ],
      {
        relativeTo: this.activatedRoute
      }
    );
    // this.router.navigate(['/cerrar']);
  }

}
