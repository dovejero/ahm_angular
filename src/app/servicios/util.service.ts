import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() {
  }

  isLogued() {
    if (localStorage.getItem('tokenAHM')) {
      return true;
    } else {
      return false;
    }
  }
  getIdUsuario() {
    if (localStorage.getItem('idAHM')) {
      return localStorage.getItem('idAHM');
    } else {
      return undefined;
    }
  }
  getUsuario() {
    if (localStorage.getItem('usuarioAHM')) {
      return localStorage.getItem('usuarioAHM');
    } else {
      return 'No Login';
    }
  }
}
