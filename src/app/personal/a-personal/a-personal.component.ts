import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../servicios/util.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { User } from '../../models/user.model'
import { Banda } from '../../models/banda.model'
import { Sala } from '../../models/sala.model'
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

      switch (row['rol']) {

        case 'user':
          if (row['fk_usuario']) {
            this.perfil = new User(row['rol'], row['nombre'], row['logo'], row['imagen'], row['activado'], row['fk_usuario']);
          } else {
            this.perfil = new User(row['rol']);
          }
          break;
        case 'banda':
          if (row['fk_usuario']) {
            this.perfil = new Banda(row['rol'], row['nombre'], row['logo'], row['imagen'], row['bio'], row['componentes'], row['tipo'], row['provincia'], row['localidad'], row['lat'], row['lng'], row['dosier'], row['redes'], row['comentario'], row['activado'], row['fk_usuario']);
            console.log('PERFILLLL: ', this.perfil)
          } else {
            this.perfil = new Banda(row['rol']);
            console.log('PERFILLLL: ', this.perfil)
          }
          break;
        case 'sala':
          if (row['fk_usuario']) {
            console.log('roooooow: ', row)
            this.perfil = new Sala(row['rol'], row['nombre'], row['logo'], row['imagen'], row['info'], row['horario'], row['aforo'], row['provincia'], row['localidad'], row['localizacion'], row['lat'], row['lng'], row['redes'], row['comentario'], row['activado'], row['fk_usuario']);
            console.log('PEPEPEPEPEPE: ', this.perfil)
          } else {
            this.perfil = new Sala(row['rol']);
            console.log('PERFILLLL: ', this.perfil)
          }
          break;
      }




    }).catch((err) => {
      console.log(err)
    })
  }

}
