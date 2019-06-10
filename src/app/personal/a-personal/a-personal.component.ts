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
    this.usuariosService.getPerfil(this.utilService.getIdUsuario).then((row) => {
      console.log(row)
    }).catch((err) => {
      console.log(err)
    })

  }

  ngOnInit() {
  }

}
