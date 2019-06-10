import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../../servicios/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  abiertoCerrado: boolean;
  url: string;
  idioma: string;
  @Output() cambioIdioma = new EventEmitter();
  constructor(private router: Router, public utilService: UtilService) {
    this.abiertoCerrado = false;
  }
  ngOnInit() {
    this.idioma = 'ES'
    console.log('router:', this.router)
  }
  abrir() {
    this.router.navigate([{ outlets: { modal: 'formIn/login' } }], { skipLocationChange: true })
  }
  mostrarBurger() {
    this.abiertoCerrado = !this.abiertoCerrado;
  }
  abrirCerrar() {
    this.abiertoCerrado = !this.abiertoCerrado;
  }
  cambiarIdioma(pIdioma: string) {
    this.idioma = pIdioma.toUpperCase();
    this.cambioIdioma.emit(pIdioma);
  }
}
