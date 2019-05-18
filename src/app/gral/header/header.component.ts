import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  abiertoCerrado: boolean;
  constructor() {
    this.abiertoCerrado = false;
  }

  ngOnInit() {
  }
  abrirCerrar() {
    console.log('ENTRA');
    this.abiertoCerrado = !this.abiertoCerrado;
  }
}
