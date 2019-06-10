import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
  formulario: FormGroup;
  control: boolean;
  constructor(private usuariosService: UsuariosService, private router: Router) {
    this.control = false;
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
      console.log(res);
      localStorage.setItem('tokenAHM', res['token']);
      this.router.navigate(['/cerrar']);
    }).catch((err) => {
      console.log('{error: err}')
    })
  }
}
