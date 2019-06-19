import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { BandasService } from '../../servicios/bandas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from '../../servicios/util.service';


@Component({
  selector: 'app-perfil-banda',
  templateUrl: './perfil-banda.component.html',
  styleUrls: ['./perfil-banda.component.css']
})
export class PerfilBandaComponent implements OnInit {
  @Input() objPerfil: any;

  pathLogo;
  pathImagen
  logoURL: any;
  imgURL: any;

  formulario: FormGroup;
  botonActivo: boolean;
  control: boolean;
  posicion: number;
  localizacion: any;
  provinciaArray: any;
  localidadArray: any;
  latitud: number;
  longitud: number;
  provincia: string;
  localidad: string;
  latlng: any;
  habilitado: boolean;
  uploadPercentImagen: Observable<number>
  uploadPercentDosier: Observable<number>
  imagenO: any;
  logoO: any;
  dosierO: any
  redesSociales: Object = {
    redes: []
  }
  update: boolean;

  constructor(private storage: AngularFireStorage, private bandasService: BandasService, private router: Router, private activatedRoute: ActivatedRoute, private utilService: UtilService) {
    this.update = true;
    this.logoURL = ''
    this.imgURL = ''
    this.latlng = {};
    this.localizacion = {}
    this.provinciaArray = [];
    this.localidadArray = [];
    this.latitud = null;
    this.longitud = null;
    this.provincia = null;
    this.localidad = null;
    this.habilitado = true;
    this.posicion = 0;
    this.control = false;
    this.botonActivo = false;

  }

  ngOnInit() {
    console.log('OBJETO PERFIL: ', this.objPerfil)
    this.logoURL = this.objPerfil.logo;
    this.imgURL = this.objPerfil.imagen;
    this.formulario = new FormGroup({
      nombre: new FormControl(this.objPerfil.nombre, [
      ]),
      bio: new FormControl(this.objPerfil.bio, [
      ]),
      componentes: new FormControl(this.objPerfil.componentes, [
      ]),
      tipo: new FormControl(this.objPerfil.tipo, [
      ]),
      provincia: new FormControl('', [
      ]),
      localidad: new FormControl('', [
      ]),
      lat: new FormControl('', [
      ]),
      lng: new FormControl('', [
      ]),
      imagen: new FormControl('', [
      ]),
      logo: new FormControl('', [
      ]),
      redes: new FormArray([
        new FormControl(this.objPerfil.redes[0], [])
      ]),
      activado: new FormControl(this.objPerfil.activado, [
      ]),
      dosier: new FormControl('', [
      ]),
      comentario: new FormControl(this.objPerfil.comentario, [
      ]),
    })
    this.latitud = this.objPerfil.lat;
    this.longitud = this.objPerfil.lng;
    this.localidad = this.objPerfil.localidad;
    this.provincia = this.objPerfil.provincia;
    if (this.objPerfil.redes.length > 1) {
      for (let i = 1; i < this.objPerfil.redes.length; i++) {
        this.agregarRedesN(this.objPerfil.redes[i])
      }
    }

    setTimeout(() => {

      if (this.objPerfil.fk_usuario != 0) {
        this.latlng = { lat: this.latitud, lng: this.longitud }
        this.update = false;
      }

    }, 1000);
    this.listaProvicias();
  }
  agregarRedesN(item) {
    (<FormArray>this.formulario.controls['redes']).push(
      new FormControl(item, [])
    );
  }
  agregarRedes() {
    (<FormArray>this.formulario.controls['redes']).push(
      new FormControl('', [])
    );
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

  onChangeDosier(e) {
    this.dosierO = e.target.files[0];
  }

  listaProvicias() {

    this.bandasService.getProvincias().then((res) => {
      this.provinciaArray = res;

    }).catch((err) => {

    });
  }
  datosLocalidad(plocalidad) {
    this.update = true;
    // console.log(plocalidad.target.value)
    let arrayLocalidades = plocalidad.target.value.split(',')
    this.bandasService.getLocalidades(arrayLocalidades[0]).then((res) => {
      this.localidadArray = res;

    }).catch((err) => {

    });
    this.provincia = arrayLocalidades[1];
    this.formulario.value.provincia = arrayLocalidades[1];
    this.formulario['provincia'] = arrayLocalidades[1];
  }
  datosLatLng(plocalidad) {
    let arrayLocalidades = plocalidad.target.value.split(',')
    this.localidad = arrayLocalidades[0];
    this.formulario.value.localidad = arrayLocalidades[0];
    this.formulario['localidad'] = arrayLocalidades[0];
    this.latitud = parseFloat(arrayLocalidades[1]);
    this.longitud = parseFloat(arrayLocalidades[2]);
    this.formulario.value.lat = this.latitud;
    this.formulario['lat'] = this.latitud;
    this.formulario.value.lng = this.longitud;
    this.formulario['lng'] = this.longitud;
    this.latlng = { lat: this.latitud, lng: this.longitud }
  }

  subirDosier(valDosier) {
    if (valDosier) {
      const filePath = 'documentos/' + this.dosierO.name;
      const fileRef = this.storage.ref(filePath);
      const tarea = this.storage.upload(filePath, this.dosierO);

      tarea.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            console.log('URL: ', url);

            this.formulario.value.dosier = url;
            this.formulario['dosier'] = filePath;
          })
        })
      ).subscribe()
    }
  }
  subirImagen(valImg, tipo) {
    console.log(valImg)
    if (valImg) {
      const filePath = 'imagenes/' + valImg.name;
      const fileRef = this.storage.ref(filePath);
      const tarea = this.storage.upload(filePath, valImg);
      // tarea.percentageChanges().subscribe(percent => {
      //   console.log(percent)
      // })
      // this.uploadPercentImagen = tarea.percentageChanges();

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
      this.formulario.value.dosier = this.objPerfil.dosier;
      this.formulario.value.tipo = this.formulario.value.tipo.toString()
      this.formulario.value.redes = this.formulario.value.redes.toString()
      this.formulario.value.provincia = this.provincia;
      this.formulario.value.localidad = this.localidad;
      this.formulario.value.lat = this.latitud;
      this.formulario.value.lng = this.longitud;
      await this.subirImagen(this.imagenO, 'imagen');
      await this.subirImagen(this.logoO, 'logo');
      await this.subirDosier(this.dosierO);
      console.log(this.formulario.value);
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
        this.bandasService.addPerfil(this.formulario.value);
      } else {
        this.bandasService.updPerfil(this.formulario.value);
      }
      console.log(this.formulario.value);
    } catch (err) {
      console.log(err)
    }
    this.botonActivo = false;
    // this.router.navigate(['/personal']);
  }

}
