import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-gral',
  templateUrl: './form-gral.component.html',
  styleUrls: ['./form-gral.component.css']
})
export class FormGralComponent implements OnInit {
  eCerrar: boolean;
  constructor(private router: Router) {
    this.eCerrar = true;
  }

  ngOnInit() {
  }
  cerrar() {
    this.eCerrar = !this.eCerrar
    this.router.navigate(["/"])
  }
}
