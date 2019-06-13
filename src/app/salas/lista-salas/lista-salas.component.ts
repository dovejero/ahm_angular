import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BandasService } from '../../servicios/bandas.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-lista-salas',
  templateUrl: './lista-salas.component.html',
  styleUrls: ['./lista-salas.component.css']
})
export class ListaSalasComponent implements OnInit {
  parametro: number;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private bandasService: BandasService) {

  }
  formulario: FormGroup;
  provinciaArray: any;
  localidadArray: any;
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
      aforo: new FormControl(0, [
      ]),
      provincia: new FormControl('', [
      ]),
      localidad: new FormControl('', [
      ])
    })
    this.listaProvicias()
  }

  listaProvicias() {
    this.bandasService.getProvincias().then((res) => {
      this.provinciaArray = res;

    }).catch((err) => {

    });
  }

  datosLocalidad(plocalidad) {
    console.log(plocalidad.target.value)
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
}
