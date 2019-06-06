import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gral-bandas',
  templateUrl: './gral-bandas.component.html',
  styleUrls: ['./gral-bandas.component.css']
})
export class GralBandasComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log('PARAMS: ', params.id);
      if (params.id == undefined) {
        this.router.navigate(['/bandas/1']);
      }

    })
  }
}
