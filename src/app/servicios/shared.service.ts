import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  noRegChange: Subject<boolean> = new Subject<boolean>();
  // tituloChange: Subject<boolean> = new Subject<boolean>();

  noReg: boolean;
  titulo: string;
  constructor() {

    this.noRegChange.subscribe((value) => {
      this.noReg = value
    });
  }

  // getTitulo() {
  //   this.sidebarVisibilityChange.next(!this.isSidebarVisible);
  //   return this.titulo;
  // }

  getNoReg() {
    this.noRegChange.next(!this.noReg);
    return this.noReg;
  }
}
