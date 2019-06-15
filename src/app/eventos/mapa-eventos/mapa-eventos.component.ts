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
        "lat": 37.14114,
        "lng": -2.780104
      },
      {
        "lat": 37.13305,
        "lng": -2.797098
      }]
  }

}
