import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  constructor() {

    this.posicion = 0
    this.steps = [true, false, false]
    this.visible = ['block', 'none', 'none']
    this.control = false;
    this.formulario = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ]),
      bio: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      ]),
      componentes: new FormControl('', [
      ])
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
  }
  adelante() {
    this.posicion += 1;
    this.cambioSteps(this.posicion);
    this.cambioDisplay(this.posicion);
  }
  atras() {
    this.posicion -= 1;
    this.cambioSteps(this.posicion);
    this.cambioDisplay(this.posicion);

  }
  tratarSubmit() {
    // console.log(this.formulario.valid);
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
