import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UtilService } from '../servicios/util.service';

@Injectable({
    providedIn: 'root'
})
export class caPersonal implements CanActivate {
    canActivate() {
        console.log('AAAAAAA', this.utilService.isLogued())
        if (localStorage.getItem('tokenAHM')) {
            return true;
        } else {
            this.router.navigate(['/eventos']);
        }

    }

    constructor(private utilService: UtilService, private router: Router) {

    }

    ngOnInit() {

    }
}