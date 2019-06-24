import { Component, OnInit } from '@angular/core';
import { SalasService } from '../../servicios/salas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EventosService } from 'src/app/servicios/eventos.service';

@Component({
  selector: 'app-ficha-salas',
  templateUrl: './ficha-salas.component.html',
  styleUrls: ['./ficha-salas.component.css']
})
export class FichaSalasComponent implements OnInit {
  datosSala: any;
  latlng: any;
  redesSociales: any;
  eventos: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private salasService: SalasService, private eventosService: EventosService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.fichaSala(params.id);
    })
  }

  fichaSala(idSala) {
    this.salasService.getFichaSala(idSala).then((res) => {
      this.datosSala = res;
      this.latlng = { lat: this.datosSala.lat, lng: this.datosSala.lng };
      console.log('DATOS SALAAAAAA: ', this.datosSala)
      this.redesSociales = this.datosSala['redes'].split(',');
    }).catch((err) => {
      // this.router.navigate([`/eventos`]);
    });
    this.eventosService.getEventosSala(idSala).then((res) => {
      this.eventos = res
    }).catch((err) => {
      console.log(err)
    });
  }

}
