import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { EventosService } from '../../servicios/eventos.service';

@Component({
  selector: 'app-mapa-eventos',
  templateUrl: './mapa-eventos.component.html',
  styleUrls: ['./mapa-eventos.component.css']
})
export class MapaEventosComponent implements OnInit {
  datosLoc: any;
  @Input() fechaInput: any;
  constructor(private eventosService: EventosService) {
    this.datosLoc = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];

      if (propName == 'fechaInput') {

      }
      this.fechaInput = change.currentValue;
      // console.log('PROPNAME', change.currentValue);
      this.buscar();

    }
  }

  ngOnInit() {
    // console.log('Fecha Inicial', this.fechaInput)
  }

  buscar() {
    this.eventosService.getFiltroEventos(this.fechaInput).then((result) => {
      // console.log('RESULTADO MAPA: ', result)
      this.datosLoc = result;
    })
  }

}
