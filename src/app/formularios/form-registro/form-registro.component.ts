import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../servicios/login.service';


import { NgRedux, NgReduxModule, select } from '@angular-redux/store';
import { IAppState, rootReducer } from '../../store/store';
import { INCREMENT, UPDATE_LOGIN } from '../../store/actions';


@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.css']
})
export class FormRegistroComponent implements OnInit {

  @select() noLogin: boolean

  formulario: FormGroup;
  control: boolean;
  opc: boolean[];
  userId: number;
  noAlta: boolean;
  constructor(private loginService: LoginService, private ngRedux: NgRedux<IAppState>) {
    this.noAlta = false;
    this.opc = [true, false, false, false]
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
    // console.log(password, reppass, form)
    if (password === reppass) return null
    return { reppassword: 'Error repetición claves' }
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
    this.loginService.registro(this.formulario.value).then((res) => {
      if (!res['ko']) {
        this.ngRedux.dispatch({ type: UPDATE_LOGIN })
        this.userId = res[0].id;
        this.noAlta = false;
        this.opc[0] = false;
        switch (this.formulario.value.rolradio) {
          case 'user':
            this.opc[1] = true;
            break;
          case 'banda':
            this.opc[2] = true;
            break;
          case 'sala':
            this.opc[3] = true;
            break;
          default:
            break;
        }
      } else {
        this.noAlta = true;
      }
    }).catch((err) => {
      this.noAlta = true;
    });

    // console.log('FORMULARIO: ', this.formulario.value);



  }
}