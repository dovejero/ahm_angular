import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gral-salas',
  templateUrl: './gral-salas.component.html',
  styleUrls: ['./gral-salas.component.css']
})
export class GralSalasComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log('PARAMS: ', params.id);
      if (params.id == undefined) {
        this.router.navigate(['/salas/1']);
      }

    })
  }

}
