import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventosService } from '../../servicios/eventos.service';

@Component({
  selector: 'app-ficha-eventos',
  templateUrl: './ficha-eventos.component.html',
  styleUrls: ['./ficha-eventos.component.css']
})
export class FichaEventosComponent implements OnInit {
  datosEvento: any;
  tipos: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private eventoService: EventosService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.fichaEvento(params.id);
    })
  }
  fichaEvento(idEvento) {
    this.eventoService.getFichaEvento(idEvento).then((res) => {
      this.datosEvento = res[0];
    }).catch((err) => {
      // this.router.navigate([`/eventos`]);
    });
  }

}
