import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  noReg: boolean;
  titulo: string;
  constructor() {
  }

  getTitulo() {
    return this.titulo;
  }

  getNoReg() {
    return this.noReg;
  }
}
