import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'
@Component({
  selector: 'app-form-banda',
  templateUrl: './form-banda.component.html',
  styleUrls: ['./form-banda.component.css']
})
export class FormBandaComponent implements OnInit {

  imagePath;
  imgURL: any;
  message: string;

  formulario: FormGroup;
  control: boolean;
  visible: string[];
  steps: boolean[];
  posicion: number;
  localizacion: any;
  provinciaArray: string[];
  localidadArray: string[];
  latitud: number;
  longitud: number;
  latlng: any;
  habilitado: boolean;
  uploadPercent: Observable<number>
  imagenO: any;
  logoO: any;

  prueba: string;
  constructor(private storage: AngularFireStorage) {
    this.latlng = {};
    this.localizacion = {}
    this.provinciaArray = [];
    this.localidadArray = [];
    this.latitud = null;
    this.longitud = null;
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
  }

  onChangeLogo(e, files) {
    console.log(e)
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
    this.logoO = e.target.files[0];
  }

  onChangeImg(e) {
    console.log(e)
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
      this.datosLocalizacion();
    }
  }
  adelante() {
    this.posicion += 1;
    if (this.posicion == 1) {
      this.datosLocalizacion();
    }
    // console.log('Datos', this.provinciaArray);
    this.cambioSteps(this.posicion);
    this.cambioDisplay(this.posicion);
  }
  atras() {
    this.posicion -= 1;
    if (this.posicion == 1) {
      this.datosLocalizacion();
    }
    this.cambioSteps(this.posicion);
    this.cambioDisplay(this.posicion);

  }
  datosLocalizacion() {
    this.localizacion = {
      "Almería": [
        {
          "poblacion": "Abla",
          "Latitud": 37.14114,
          "Longitud": -2.780104
        },
        {
          "poblacion": "Abrucena",
          "Latitud": 37.13305,
          "Longitud": -2.797098
        }],
      "Madrid": [
        {
          "poblacion": "Fuenlabrada",
          "Latitud": 37.14114,
          "Longitud": -2.780104
        },
        {
          "poblacion": "Leganés",
          "Latitud": 37.13305,
          "Longitud": -2.797098
        }]
    }
    this.provinciaArray = [];
    let provincia = Object.keys(this.localizacion);
    for (let prop of provincia) {
      this.provinciaArray.push(prop)
    }
  }
  datosUbicacion(provincia) {
    // console.log(provincia.target.value);
    for (let item in this.localizacion) {
      if (item == provincia.target.value) {
        this.localidadArray = this.localizacion[item]
      }
    }
    this.habilitado = false;
  }
  datosLocalidad(plocalidad) {
    function local(dato) {
      return dato.poblacion == plocalidad.target.value;
    }
    let valor = this.localidadArray.find(local);
    let newValor = JSON.stringify(valor);
    let objeto = JSON.parse(newValor);
    this.latitud = parseFloat(objeto.Latitud);
    this.longitud = parseFloat(objeto.Longitud);
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
          console.log('URL: ', url);

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
