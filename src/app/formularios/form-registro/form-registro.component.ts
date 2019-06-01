import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.css']
})
export class FormRegistroComponent implements OnInit {
  formulario: FormGroup;
  control: boolean;
  opc0: boolean;
  opc1: boolean;
  opc2: boolean;
  opc3: boolean;
  constructor() {
    this.opc0 = true;
    this.opc1 = false;
    this.opc2 = false;
    this.opc3 = false;
    this.control = false;
    this.formulario = new FormGroup({
      usuario: new FormControl('user', [
        Validators.required
      ]),
      mail: new FormControl('aaa@aaa.com', [
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      ]),
      password: new FormControl('asdfasd1', [
        Validators.required,
        Validators.pattern(/^(?=.*\d).{4,8}$/)
      ]),
      reppassword: new FormControl('asdfasd1', [
        Validators.required,
        Validators.pattern(/^(?=.*\d).{4,8}$/)
      ]),
      rolradio: new FormControl('user'),
    }, [this.passwordRepeat])
  }

  ngOnInit() {
  }

  passwordRepeat(form: FormGroup) {
    let password = form.controls['password'].value
    let reppass = form.controls['reppassword'].value
    console.log(password, reppass, form)
    if (password === reppass) return null
    return { reppassword: 'Error repetición claves' }
  }

  tratarSubmit() {
    console.log(this.formulario.valid);
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

    console.log('FORMULARIO: ', this.formulario.value.rolradio);
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
        this.opc3 = true;
        break;
      default:
        break;
    }


  }
}