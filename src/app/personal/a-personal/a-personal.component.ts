import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../servicios/util.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { User } from '../../models/user.model'

@Component({
  selector: 'app-a-personal',
  templateUrl: './a-personal.component.html',
  styleUrls: ['./a-personal.component.css']
})
export class APersonalComponent implements OnInit {
  perfil: any;
  constructor(private utilService: UtilService, private usuariosService: UsuariosService) {
    this.perfil = null;
  }

  ngOnInit() {
    let idUsuario = { idUsuario: this.utilService.getIdUsuario() }
    this.usuariosService.getPerfil(idUsuario).then((row) => {
      console.log('ROW PERFIL: ', row)

      if (row['fk_usuario']) {
        this.perfil = new User(row['rol'], row['nombre'], row['logo'], row['imagen'], row['activado'], row['fk_usuario']);
        console.log('PERFILLLL: ', this.perfil)
      } else {
        this.perfil = new User(row['rol']);
        console.log('PERFILLLL: ', this.perfil)
      }


    }).catch((err) => {
      console.log(err)
    })
  }

}
