import { Component, OnInit } from '@angular/core';
import { SalasService } from '../../servicios/salas.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ficha-salas',
  templateUrl: './ficha-salas.component.html',
  styleUrls: ['./ficha-salas.component.css']
})
export class FichaSalasComponent implements OnInit {
  datosSala: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private salasService: SalasService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.fichaSala(params.id);
    })
  }

  fichaSala(idSala) {
    this.salasService.getFichaSala(idSala).then((res) => {
      this.datosSala = res;
      console.log('DATOS SALAAAAAA: ', this.datosSala)
    }).catch((err) => {
      this.router.navigate([`/eventos`]);
    });
  }

}
