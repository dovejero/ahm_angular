import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BandasService } from '../../servicios/bandas.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SalasService } from '../../servicios/salas.service';

@Component({
  selector: 'app-lista-bandas',
  templateUrl: './lista-bandas.component.html',
  styleUrls: ['./lista-bandas.component.css']
})
export class ListaBandasComponent implements OnInit {
  parametro: number;
  page: number;
  total: number;
  formulario: FormGroup;
  provinciaArray: any;
  localidadArray: any;
  listaFiltrada: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private bandasService: BandasService, private salasService: SalasService) {
    this.page = 1;
    this.total = 0;
  }

  ngOnInit() {
    this.provinciaArray = [];
    this.localidadArray = [];
    this.formulario = new FormGroup({
      nombre: new FormControl('', [
      ]),
      tipo: new FormControl('', [
      ]),
      provincia: new FormControl('', [
      ]),
      localidad: new FormControl('', [
      ])
    })
    this.enviarFormulario();
    this.listaProvicias();

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
  }
  datosLatLng(plocalidad) {
    let arrayLocalidades = plocalidad.target.value.split(',')
    this.formulario.value.localidad = arrayLocalidades[0];
    let value = this.formulario.value.provincia.split(',')
    this.formulario.value.provincia = value[1];
  }
  resetearForm() {
    this.page = 1;
    this.total = 0;
    this.formulario = new FormGroup({
      nombre: new FormControl('', [
      ]),
      tipo: new FormControl('', [
      ]),
      provincia: new FormControl('', [
      ]),
      localidad: new FormControl('', [
      ])
    })
    this.localidadArray = [];
    this.provinciaArray = [];
    this.listaProvicias();
  }
  datosTipo() {
    let value = this.formulario.value.provincia.split(',')
    this.formulario.value.provincia = value[1];
    let value2 = this.formulario.value.localidad.split(',')
    this.formulario.value.localidad = value2[0];
  }
  abrirFicha(id) {
    this.router.navigate(['/bandas/' + id])
  }
  enviarFormulario() {
    if (this.formulario.value.provincia == undefined || this.formulario.value.localidad == undefined) {
      this.formulario.value.provincia = "";
      this.formulario.value.localidad = "";
    } else {
    }
    console.log('ENVIO FORMULARIO: ', this.formulario.value)
    let envioDatos = { pagina: this.page, datos: this.formulario.value }
    this.bandasService.getFiltroBandas(envioDatos).then((res) => {
      console.log('RESPUESTA FILTRO: ', res)
      this.listaFiltrada = res['datos'];
      this.total = res['total'];
    }).catch((err) => {
      console.log(err)
    })
  }
}