import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../servicios/util.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { User } from '../../models/user.model'
import { Banda } from '../../models/banda.model'

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

          break;
      }




    }).catch((err) => {
      console.log(err)
    })
  }

}
