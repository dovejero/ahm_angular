import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gral-eventos',
  templateUrl: './gral-eventos.component.html',
  styleUrls: ['./gral-eventos.component.css']
})
export class GralEventosComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log('PARAMS: ', params.id);
      if (params.id == undefined) {
        this.router.navigate(['/eventos/1']);
      }

    })
  }

}
