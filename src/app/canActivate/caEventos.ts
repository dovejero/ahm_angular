import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class caEventos implements CanActivate {
    canActivate() {
        localStorage.removeItem('tokenAHM');
        return true;
    }

    constructor(private router: Router) {

    }

    ngOnInit() {

    }
}