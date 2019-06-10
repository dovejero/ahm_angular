import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UtilService } from '../servicios/util.service';

@Injectable({
    providedIn: 'root'
})
export class caEventos implements CanActivate {
    canActivate() {
        localStorage.removeItem('tokenAHM');
        localStorage.removeItem('idAHM');
        localStorage.removeItem('usuarioAHM');
        return true;
    }

    constructor(private router: Router, private utilService: UtilService) {

    }

    ngOnInit() {

    }
}