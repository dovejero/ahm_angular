import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-gral',
  templateUrl: './form-gral.component.html',
  styleUrls: ['./form-gral.component.css']
})
export class FormGralComponent implements OnInit {
  eCerrar: boolean;
  prueba: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.eCerrar = true;
    this.activatedRoute.params.subscribe((params) => {
      console.log('PARAM: ', params)
      this.prueba = params;
    })
  }

  ngOnInit() {
  }
  cerrar() {
    this.eCerrar = !this.eCerrar
    console.log('URL: ', this.prueba)
    // let url = this.router.url.split('(');
    // console.log('lll: ', url[0])
    this.router.navigate([{ outlets: { modal: null } }], { relativeTo: this.activatedRoute.parent })
  }
}
