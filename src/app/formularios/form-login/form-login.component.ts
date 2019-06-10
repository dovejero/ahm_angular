import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
  formulario: FormGroup;
  control: boolean;
  constructor(private usuariosService: UsuariosService) {
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
    }).catch((err) => {
      console.log('{error: err}')
    })

    // TO DO
    // Validación en servicio con el servidor. 
    // Error si no es correcto encima del botón acceder eje error usu y pass
    // Cerrar ventana al logarse. Poner nombre usu en el nav. 
  }
}
