import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-salas',
  templateUrl: './lista-salas.component.html',
  styleUrls: ['./lista-salas.component.css']
})
export class ListaSalasComponent implements OnInit {
  parametro: number;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    // this.activatedRoute.parent.params.subscribe(params => {
    //   console.log('PARAMS PADRE: ', params.id);
    //   this.parametro = params.id;
    // })
  }

}
