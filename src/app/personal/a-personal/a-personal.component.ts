import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../servicios/util.service';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-a-personal',
  templateUrl: './a-personal.component.html',
  styleUrls: ['./a-personal.component.css']
})
export class APersonalComponent implements OnInit {

  constructor(private utilService: UtilService, private usuariosService: UsuariosService) {
    let idUsuario = { idUsuario: this.utilService.getIdUsuario() }
    console.log('IDUSUARIO: ', idUsuario)
    this.usuariosService.getPerfil(idUsuario).then((row) => {
      console.log('ROW PERFIL: ', row)
    }).catch((err) => {
      console.log(err)
    })

  }

  ngOnInit() {
  }

}
