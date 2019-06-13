import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BandasService } from '../../servicios/bandas.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SalasService } from '../../servicios/salas.service';

@Component({
  selector: 'app-lista-salas',
  templateUrl: './lista-salas.component.html',
  styleUrls: ['./lista-salas.component.css']
})
export class ListaSalasComponent implements OnInit {
  parametro: number;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private bandasService: BandasService, private salasService: SalasService) {

  }
  formulario: FormGroup;
  provinciaArray: any;
  localidadArray: any;
  listaFiltrada: any;
  ngOnInit() {
    // this.activatedRoute.parent.params.subscribe(params => {
    //   console.log('PARAMS PADRE: ', params.id);
    //   this.parametro = params.id;
    // })
    this.provinciaArray = [];
    this.localidadArray = [];
    this.formulario = new FormGroup({
      nombre: new FormControl('', [
      ]),
      aforo: new FormControl('', [
      ]),
      provincia: new FormControl('', [
      ]),
      localidad: new FormControl('', [
      ])
    })
    this.listaProvicias()
    this.salasService.getAllSalas().then((res) => {
      this.listaFiltrada = res;
    }).catch((err) => {

    })
  }

  listaProvicias() {
    this.bandasService.getProvincias().then((res) => {
      this.provinciaArray = res;

    }).catch((err) => {

    });
  }

  datosLocalidad(plocalidad) {

    console.log('ytytytyt: ', plocalidad.target.value)
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
  }
  resetearForm() {
    // this.formulario.reset();
    this.formulario.value.localidad = ""
    this.formulario.value.provincia = ""
    this.formulario.value.aforo = ""
    this.formulario.value.nombre = ""
  }
  enviarFormulario() {

    if (this.formulario.value.provincia == undefined || this.formulario.value.localidad == undefined) {
      this.formulario.value.provincia = "";
      this.formulario.value.localidad = "";
    }
    console.log('FORMU: ', this.formulario.value)
    this.salasService.getFiltroSalas(this.formulario.value).then((res) => {
      console.log('RESDKAÑSLKDF: ', res)
      // this.listaFiltrada = res;
    }).catch((err) => {
      console.log(err)
    })
  }
}
