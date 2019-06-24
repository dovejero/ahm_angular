import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SalasService } from '../../servicios/salas.service';

@Component({
  selector: 'app-gral-salas',
  templateUrl: './gral-salas.component.html',
  styleUrls: ['./gral-salas.component.css']
})
export class GralSalasComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private salasService: SalasService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      // console.log('PARAMS: ', params.id);
      if (params.id == undefined) {
        this.salasService.getRandomId().then((res) => {
          let idRandom = res['id']
          this.router.navigate([`/salas/${idRandom}`]);
        }).catch((err) => {
          // this.router.navigate([`/salas/1`]);
        });
      }
    })
  }

}
