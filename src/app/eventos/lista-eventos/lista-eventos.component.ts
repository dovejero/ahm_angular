import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BandasService } from '../../servicios/bandas.service';
import { FormGroup, FormControl } from '@angular/forms';
import { EventosService } from '../../servicios/eventos.service';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})
export class ListaEventosComponent implements OnInit {
  @Input() fechaInput: any;
  parametro: number;
  page: number;
  total: number;
  formulario: FormGroup;
  provinciaArray: any;
  localidadArray: any;
  listaFiltrada: any;


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private bandasService: BandasService, private eventosService: EventosService) {
    this.page = 1;
    this.total = 0;
  }

  ngOnInit() {
    // this.activatedRoute.parent.params.subscribe(params => {
    //   console.log('PARAMS PADRE: ', params.id);
    //   this.parametro = params.id;
    // })
    this.provinciaArray = [];
    this.localidadArray = [];
    this.formulario = new FormGroup({
      tipo: new FormControl('', [
      ]),
      provincia: new FormControl('', [
      ]),
      localidad: new FormControl('', [
      ]),
      year: new FormControl('', [
      ]),
      month: new FormControl('', [
      ]),
      day: new FormControl('', [
      ])
    })
    // this.envPaginado();
    this.enviarFormulario();
    this.listaProvicias();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];

      if (propName == 'fechaInput') {

      }
      this.fechaInput = change.currentValue;
      this.formulario.value.year = this.fechaInput.year;
      this.formulario.value.month = this.fechaInput.month;
      this.formulario.value.day = this.fechaInput.day;
      console.log('PROPNAME', change.currentValue);
    }
  }

  listaProvicias() {
    this.bandasService.getProvincias().then((res) => {
      this.provinciaArray = res;

    }).catch((err) => {

    });
  }

  datosLocalidad(plocalidad) {
    if (plocalidad == undefined || plocalidad == null) {
      this.formulario.value.provincia = "";
    }
    let arrayLocalidades = plocalidad.target.value.split(',')
    this.bandasService.getLocalidades(arrayLocalidades[0]).then((res) => {
      this.localidadArray = res;

    }).catch((err) => {

    });
    this.formulario.value.provincia = arrayLocalidades[1];
    console.log('1- ', this.formulario.value.provincia)
  }
  datosLatLng(plocalidad) {
    let arrayLocalidades = plocalidad.target.value.split(',')
    this.formulario.value.localidad = arrayLocalidades[0];
    let value = this.formulario.value.provincia.split(',')
    this.formulario.value.provincia = value[1];
    console.log('2- ', this.formulario.value.provincia)
  }
  resetearForm() {
    this.page = 1;
    this.formulario = new FormGroup({
      tipo: new FormControl('', [
      ]),
      provincia: new FormControl('', [
      ]),
      localidad: new FormControl('', [
      ]),
      year: new FormControl('', [
      ]),
      month: new FormControl('', [
      ]),
      day: new FormControl('', [
      ])
    })
    // this.formulario.value.year = this.fechaInput.year;
    // this.formulario.value.month = this.fechaInput.month;
    // this.formulario.value.day = this.fechaInput.day;
    this.localidadArray = [];
    this.provinciaArray = [];
    this.listaProvicias();
  }

  abrirFicha(id) {
    this.router.navigate(['/salas/' + id])
  }

  onPageChange(e) {
    console.log('CAMBIO PÁGINA', e)
    this.page = e;
    this.enviarFormulario();
  }
  datosTipo() {
    let value = this.formulario.value.provincia.split(',')
    this.formulario.value.provincia = value[1];
    let value2 = this.formulario.value.localidad.split(',')
    this.formulario.value.localidad = value2[0];
  }

  enviarFormulario() {
    if (this.formulario.value.provincia == undefined || this.formulario.value.localidad == undefined) {
      this.formulario.value.provincia = "";
      this.formulario.value.localidad = "";
    } else {
      this.formulario.value.year = this.fechaInput.year;
      this.formulario.value.month = this.fechaInput.month;
      this.formulario.value.day = this.fechaInput.day;
      // let value = this.formulario.value.provincia.split(',')
      // this.formulario.value.provincia = value[1];
      // this.formulario.value.localidad = ;
    }
    console.log('ENVIO FORMULARIO: ', this.formulario.value)
    let envioDatos = { pagina: this.page, datos: this.formulario.value }
    console.log(envioDatos)
    this.eventosService.getFiltroEventosPag(envioDatos).then((res) => {
      console.log('RESPUESTA FILTRO: ', res)
      this.listaFiltrada = res['datos'];
      this.total = res['total'];
    }).catch((err) => {
      console.log(err)
    })
  }
}
