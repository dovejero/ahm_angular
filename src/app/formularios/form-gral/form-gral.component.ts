import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NgRedux, NgReduxModule, select } from '@angular-redux/store';
import { IAppState, rootReducer } from '../../store/store';
import { INCREMENT, UPDATE_LOGIN } from '../../store/actions';


@Component({
  selector: 'app-form-gral',
  templateUrl: './form-gral.component.html',
  styleUrls: ['./form-gral.component.css']
})
export class FormGralComponent implements OnInit {

  @select() noLogin: boolean;
  noLoginCambio: boolean;

  eCerrar: boolean;
  opciones: boolean;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private ngRedux: NgRedux<IAppState>) {
    this.eCerrar = true;
    this.opciones = false;


  }

  ngOnInit() {
    this.noLoginCambio = this.ngRedux.getState().noLogin
    this.ngRedux.subscribe(() => {
      console.log(this.ngRedux.getState().noLogin)
      this.noLoginCambio = this.ngRedux.getState().noLogin
    })
  }
  cerrar() {
    this.eCerrar = !this.eCerrar
    console.log('URL: ', this.activatedRoute.parent)
    // let url = this.router.url.split('(');
    // console.log('lll: ', url[0])
    this.router.navigate([{ outlets: { modal: null } }], { relativeTo: this.activatedRoute.parent })
  }
  cambioOpcionesLogin() {
    this.opciones = !this.opciones
    console.log('URL: ', this.activatedRoute.parent)
    this.router.navigate([{ outlets: { modal: 'formIn/login' } }], { skipLocationChange: true })
  }
  cambioOpcionesRegistro() {
    this.opciones = !this.opciones
    console.log('URL: ', this.activatedRoute.parent)
    this.router.navigate([{ outlets: { modal: 'formIn/registro' } }], { skipLocationChange: true })
  }
}
