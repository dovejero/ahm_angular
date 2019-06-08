import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { BandasService } from '../../servicios/bandas.service';
@Component({
  selector: 'app-form-banda',
  templateUrl: './form-banda.component.html',
  styleUrls: ['./form-banda.component.css']
})
export class FormBandaComponent implements OnInit {

  pathLogo;
  pathImagen
  logoURL: any;
  imgURL: any;
  message: string;

  formulario: FormGroup;
  control: boolean;
  visible: string[];
  steps: boolean[];
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
  uploadPercent: Observable<number>
  imagenO: any;
  logoO: any;

  prueba: string;
  constructor(private storage: AngularFireStorage, private bandasService: BandasService) {
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
    this.steps = [true, false, false]
    this.visible = ['block', 'none', 'none']
    this.control = false;
    this.formulario = new FormGroup({
      nombre: new FormControl('', [
      ]),
      bio: new FormControl('', [
      ]),
      componentes: new FormControl('', [
      ]),
      tipo: new FormControl('', [
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
    })
  }

  ngOnInit() {
    this.listaProvicias();
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

  cambioSteps(valor) {
    for (let el = 0; el < this.steps.length; el++) {
      this.steps[el] = false;
      if (el == this.steps.length - 1) {
        this.steps[valor] = true;
      }
    }
  }
  cambioDisplay(valor) {
    for (let el = 0; el < this.visible.length; el++) {
      this.visible[el] = 'none';
      if (el == this.steps.length - 1) {
        this.visible[valor] = 'block';
      }
    }
  }
  cambioOpcion(valor) {
    this.cambioSteps(valor);
    this.cambioDisplay(valor);
    this.posicion = valor;
    if (this.posicion == 1) {
      this.listaProvicias();
    }
  }
  adelante() {
    this.posicion += 1;
    if (this.posicion == 1) {
      this.listaProvicias();
    }
    // console.log('Datos', this.provinciaArray);
    this.cambioSteps(this.posicion);
    this.cambioDisplay(this.posicion);
  }
  atras() {
    this.posicion -= 1;
    if (this.posicion == 1) {
      this.listaProvicias();
    }
    this.cambioSteps(this.posicion);
    this.cambioDisplay(this.posicion);

  }
  listaProvicias() {
    this.bandasService.getProvincias().then((res) => {
      this.provinciaArray = res;

    }).catch((err) => {

    });
  }
  // datosUbicacion(idProvincia) {
  //   // console.log(provincia.target.value);
  //   for (let item in this.localizacion) {
  //     if (item == provincia.target.value) {
  //       this.localidadArray = this.localizacion[item]
  //     }
  //   }
  // }
  datosLocalidad(plocalidad) {
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
  tratarSubmit() {
    console.log(this.formulario.value);
    if (!this.formulario.valid) {
      this.control = true;
    } else {
      this.control = false;
      this.subirImagen(this.imagenO, 'imagen')
      this.subirImagen(this.logoO, 'logo')
    }
  }
  subirImagen(valImg, tipo) {
    const filePath = 'imagenes/' + valImg.name;
    const fileRef = this.storage.ref(filePath);
    const tarea = this.storage.upload(filePath, valImg);
    // tarea.percentageChanges().subscribe(percent => {
    //   console.log(percent)
    // })
    this.uploadPercent = tarea.percentageChanges();

    tarea.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          // console.log('URL: ', url);

          // Aquí guardaría en el array la url de la imagen para meterla en bbdd
          if (tipo == 'imagen') {
            this.formulario.value.imagen = url;
            this.formulario['imagen'] = filePath;
          } else if (tipo == 'logo') {
            this.formulario.value.logo = url;
            this.formulario['logo'] = filePath;
          }


          // console.log('FORMULARIO: ', this.formulario);
        })
      })
    ).subscribe()
  }

}
