import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa-eventos',
  templateUrl: './mapa-eventos.component.html',
  styleUrls: ['./mapa-eventos.component.css']
})
export class MapaEventosComponent implements OnInit {
  datosLoc: any[];
  constructor() {
    this.datosLoc = [];
  }

  ngOnInit() {
    this.datosLoc = [
      {
        "poblacion": "Abla",
        "Latitud": 37.14114,
        "Longitud": -2.780104
      },
      {
        "poblacion": "Abrucena",
        "Latitud": 37.13305,
        "Longitud": -2.797098
      }]
  }

}
