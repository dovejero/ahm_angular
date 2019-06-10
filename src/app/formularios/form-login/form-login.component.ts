import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Router } from '@angular/router';
import { UtilService } from '../../servicios/util.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
  formulario: FormGroup;
  control: boolean;
  errorlogin: boolean;
  constructor(private usuariosService: UsuariosService, private router: Router, private utilService: UtilService) {
    this.control = false;
    this.errorlogin = false;
    this.formulario = new FormGroup({
      mail: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*\d).{4,8}$/)
      ])
    })
  }

  ngOnInit() {
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
    console.log('FORMULARIO: ', this.formulario);
    this.usuariosService.login(this.formulario.value).then((res) => {
      console.log('RESresRES: ', res);
      if (res['token']) {
        localStorage.setItem('idAHM', res['idUsuario']);
        localStorage.setItem('usuarioAHM', res['usuario']);
        localStorage.setItem('tokenAHM', res['token']);
        this.router.navigate(['/cerrar']);
      } else {
        this.errorlogin = true;
      }
    }).catch((err) => {
      console.log('{error: err}')
    })
  }
}
