import { Component, OnInit } from '@angular/core';
import { SalasService } from '../../servicios/salas.service';

@Component({
  selector: 'app-mapa-salas',
  templateUrl: './mapa-salas.component.html',
  styleUrls: ['./mapa-salas.component.css']
})
export class MapaSalasComponent implements OnInit {

  constructor(private salasService: SalasService) { }
  datosLoc: any;
  ngOnInit() {
    this.salasService.getAllSalas().then((res) => {
      this.datosLoc = res;
      console.log('RES RES RES RES RES ', this.datosLoc)
    }).catch((err) => {

    })
  }

}
