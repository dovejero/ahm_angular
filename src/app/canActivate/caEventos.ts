import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class caEventos implements CanActivate {
    canActivate() {
        console.log('accede al guard');
        // this.router.navigate(['/eventos/1']);
        return true;
    }

    constructor(private router: Router) {

    }

    ngOnInit() {

    }
}