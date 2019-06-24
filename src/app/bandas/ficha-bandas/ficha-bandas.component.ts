import { Component, OnInit } from '@angular/core';
import { BandasService } from '../../servicios/bandas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EventosService } from '../../servicios/eventos.service';

@Component({
  selector: 'app-ficha-bandas',
  templateUrl: './ficha-bandas.component.html',
  styleUrls: ['./ficha-bandas.component.css']
})
export class FichaBandasComponent implements OnInit {

  datosBanda: any;
  latlng: any;
  eventos: any;
  redesSociales: any

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private bandasService: BandasService, private eventosService: EventosService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.fichaBanda(params.id);
    })
  }

  fichaBanda(idSala) {
    this.bandasService.getFichaBanda(idSala).then((res) => {
      this.datosBanda = res;
      this.latlng = { lat: this.datosBanda.lat, lng: this.datosBanda.lng };
      this.redesSociales = this.datosBanda['redes'].split(',');
    }).catch((err) => {
      this.router.navigate([`/eventos`]);
    });
    this.eventosService.getEventosBanda(idSala).then((res) => {
      this.eventos = res
      console.log('EVENTOS: ', this.eventos)
    }).catch((err) => {
      console.log(err)
    });
  }

}
