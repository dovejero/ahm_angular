import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventosService } from '../../servicios/eventos.service';

@Component({
  selector: 'app-gral-eventos',
  templateUrl: './gral-eventos.component.html',
  styleUrls: ['./gral-eventos.component.css']
})
export class GralEventosComponent implements OnInit {
  dateInput: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private eventosService: EventosService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params.id == undefined) {
        this.eventosService.getRandomId().then((res) => {
          let idRandom = res['id']
          this.router.navigate([`/eventos/${idRandom}`]);
        }).catch((err) => {
          this.router.navigate([`/eventos/1`]);
        });
      }

    })
  }
  cambioFecha(e) {
    this.dateInput = e;
  }

}
