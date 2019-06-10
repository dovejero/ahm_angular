import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BandasService } from '../../servicios/bandas.service'

import { NgRedux, NgReduxModule, select } from '@angular-redux/store';
import { IAppState, rootReducer } from '../../store/store';
import { INCREMENT, UPDATE_LOGIN } from '../../store/actions';

@Component({
  selector: 'app-gral-bandas',
  templateUrl: './gral-bandas.component.html',
  styleUrls: ['./gral-bandas.component.css']
})
export class GralBandasComponent implements OnInit {
  counter = 0;

  @select() noLogin: boolean

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private bandasService: BandasService, private ngRedux: NgRedux<IAppState>) {

    ngRedux.subscribe(() => {
      let store = ngRedux.getState()
      console.log(ngRedux.getState().noLogin)
      this.counter = store.counter
    })
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params.id == undefined) {
        this.bandasService.getRandomId().then((res) => {
          let idRandom = res['id']
          this.router.navigate([`/bandas/${idRandom}`]);
        }).catch((err) => {
          this.router.navigate([`/bandas/1`]);
        });
      }

    })
  }
  increment() {
    this.ngRedux.dispatch({ type: INCREMENT })
    this.ngRedux.dispatch({ type: UPDATE_LOGIN })
  }
}
