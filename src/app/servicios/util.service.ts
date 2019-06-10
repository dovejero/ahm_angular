import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  compToken: boolean;
  constructor() {
    this.compToken = false;
  }

  isLogued() {
    if (localStorage.getItem('tokenAHM')) {
      return true;
    } else {
      return false;
    }
  }
}
