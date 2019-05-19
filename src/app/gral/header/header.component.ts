import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  abiertoCerrado: boolean;
  url: string;
  constructor(private router: Router) {
    this.abiertoCerrado = false;
  }
  ngOnInit() {
    console.log('router:', this.router)
  }

  mostrarBurger() {
    console.log('ENTRA')
    this.abiertoCerrado = !this.abiertoCerrado;
  }
  abrirCerrar() {
    console.log('ENTRA');
    this.abiertoCerrado = !this.abiertoCerrado;
  }
}
