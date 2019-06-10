import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { NgRedux, NgReduxModule, select } from '@angular-redux/store';
import { IAppState, rootReducer } from '../store/store';
import { UPDATE_LOGIN } from '../store/actions';

@Injectable({
    providedIn: 'root'
})
export class caCerrar implements CanActivate {
    canActivate() {
        this.ngRedux.dispatch({ type: UPDATE_LOGIN })
        return true;
    }

    constructor(private router: Router, private ngRedux: NgRedux<IAppState>) {

    }

    ngOnInit() {

    }
}