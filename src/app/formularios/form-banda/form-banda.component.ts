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
  opc0: boolean;
  opc1: boolean;
  opc2: boolean;
  i: number;
  constructor() {
    this.i = 0
    this.opc0 = true;
    this.opc1 = false;
    this.opc2 = false;
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
  cambioOpcion(valor) {
    this.opc0 = false
    this.opc1 = false
    this.opc2 = false
    this.i = valor;
    eval("this.opc" + this.i + "=" + true);
  }
  adelante() {
    this.opc0 = false
    this.opc1 = false
    this.opc2 = false
    this.i += 1
    eval("this.opc" + this.i + "=" + true);
    console.log("I ", this.i, " this.opc0 ", this.opc0, " this.opc1 ", this.opc1, " this.opc2 ", this.opc2)
  }
  atras() {
    this.opc0 = false
    this.opc1 = false
    this.opc2 = false
    this.i -= 1
    eval("this.opc" + this.i + "=" + true);
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
    this.opc0 = false;

    //si valida el alta de usuario y no coincide con ninguno dado de alta pase al siguiente paso. Puede saltarse estos pasos. Por defecto estará desactivado el perfil si no complimenta los campos de registro.
    switch (this.formulario.value.rolradio) {
      case 'user':
        this.opc1 = true;
        break;
      case 'banda':
        this.opc2 = true;
        break;
      case 'sala':
        break;
      default:
        break;
    }


  }

}
