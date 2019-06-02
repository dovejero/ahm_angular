import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';
@Component({
  selector: 'app-form-banda',
  templateUrl: './form-banda.component.html',
  styleUrls: ['./form-banda.component.css']
})
export class FormBandaComponent implements OnInit {

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

  prueba: string;
  constructor() {
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
    })
  }

  ngOnInit() {
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
    this.latlng = { lat: this.latitud, lng: this.longitud }

  }
  tratarSubmit() {
    console.log(this.formulario.value);
    if (!this.formulario.valid) {
      this.control = true;
    } else {
      this.control = false;
      this.tratarLogin();
    }
  }
  tratarLogin() {

    // TO DO
    // Validación en servicio con el servidor. 
    // Tratar y devolver error en caso de que no se pueda registrar. En caso correcto pasar a la opción del radio
    // Quitar opción de abajo de volver a login cuando registre 

    // console.log('FORMULARIO: ', this.formulario.value.rolradio);

    //si valida el alta de usuario y no coincide con ninguno dado de alta pase al siguiente paso. Puede saltarse estos pasos. Por defecto estará desactivado el perfil si no complimenta los campos de registro.
    switch (this.formulario.value.rolradio) {
      case 'user':
        break;
      case 'banda':
        break;
      case 'sala':
        break;
      default:
        break;
    }


  }

}
