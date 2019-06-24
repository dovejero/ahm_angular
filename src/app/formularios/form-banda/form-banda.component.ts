import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { BandasService } from '../../servicios/bandas.service';
import { Router, ActivatedRoute } from '@angular/router';


import { NgRedux, NgReduxModule, select } from '@angular-redux/store';
import { IAppState, rootReducer } from '../../store/store';
import { INCREMENT, UPDATE_LOGIN } from '../../store/actions';

@Component({
  selector: 'app-form-banda',
  templateUrl: './form-banda.component.html',
  styleUrls: ['./form-banda.component.css']
})
export class FormBandaComponent implements OnInit {
  @Input() idUsuario: number;
  pathLogo;
  pathImagen
  logoURL: any;
  imgURL: any;

  formulario: FormGroup;
  botonActivo: boolean;
  control: boolean;
  visible: string[];
  steps: boolean[];
  posicion: number;
  localizacion: any;
  provinciaArray: any;
  localidadArray: any;
  latitud: number;
  longitud: number;
  provincia: string;
  localidad: string;
  latlng: any;
  habilitado: boolean;
  uploadPercentImagen: Observable<number>
  uploadPercentDosier: Observable<number>
  imagenO: any;
  logoO: any;
  dosierO: any
  redesSociales: Object = {
    redes: []
  }
  constructor(private storage: AngularFireStorage, private bandasService: BandasService, private router: Router, private activatedRoute: ActivatedRoute, private ngRedux: NgRedux<IAppState>) {
    this.logoURL = "https://image.flaticon.com/icons/svg/15/15081.svg"
    this.imgURL = "http://pluspng.com/img-png/music-band-png-hd-bands-1200.jpg"
    this.latlng = {};
    this.localizacion = {}
    this.provinciaArray = [];
    this.localidadArray = [];
    this.latitud = null;
    this.longitud = null;
    this.provincia = null;
    this.localidad = null;
    this.habilitado = true;
    this.posicion = 0;
    this.steps = [true, false, false, false]
    this.visible = ['block', 'none', 'none', 'none']
    this.control = false;
    this.botonActivo = false;
    this.formulario = new FormGroup({
      nombre: new FormControl('', [
      ]),
      bio: new FormControl('', [
      ]),
      componentes: new FormControl(0, [
      ]),
      tipo: new FormControl('', [
      ]),
      provincia: new FormControl('', [
      ]),
      localidad: new FormControl('', [
      ]),
      lat: new FormControl('', [
      ]),
      lng: new FormControl('', [
      ]),
      imagen: new FormControl('', [
      ]),
      logo: new FormControl('', [
      ]),
      redes: new FormArray([
        new FormControl('', [])
      ]),
      activado: new FormControl(false, [
      ]),
      dosier: new FormControl('', [
      ]),
      comentario: new FormControl('', [
      ]),
    })
  }

  ngOnInit() {
    this.listaProvicias();
  }
  agregarRedes() {
    (<FormArray>this.formulario.controls['redes']).push(
      new FormControl('', [])
    );
  }

  onChangeLogo(e, files) {
    // console.log('LOGO ', files)
    if (files.length === 0)
      return;
    var reader = new FileReader();
    // this.pathLogo = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.logoURL = reader.result;
    }
    this.logoO = e.target.files[0];
  }

  onChangeImg(e, files2) {
    // console.log('IMG ', files2)
    if (files2.length === 0)
      return;
    var reader = new FileReader();
    reader.readAsDataURL(files2[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
    this.imagenO = e.target.files[0];
  }

  onChangeDosier(e) {
    this.dosierO = e.target.files[0];
  }



  cambioSteps(valor) {
    for (let el = 0; el < this.steps.length; el++) {
      this.steps[el] = false;
      if (el == this.steps.length - 1) {
        this.steps[valor] = true;
      }
    }
  }
  cambioDisplay(valor) {
    for (let el = 0; el < this.visible.length; el++) {
      this.visible[el] = 'none';
      if (el == this.steps.length - 1) {
        this.visible[valor] = 'block';
      }
    }
  }
  cambioOpcion(valor) {
    this.cambioSteps(valor);
    this.cambioDisplay(valor);
    this.posicion = valor;
    if (this.posicion == 1) {
      this.listaProvicias();
    }
  }
  adelante() {
    this.posicion += 1;
    if (this.posicion == 2) {
      this.listaProvicias();
    }
    // console.log('Datos', this.provinciaArray);
    this.cambioSteps(this.posicion);
    this.cambioDisplay(this.posicion);
  }
  atras() {
    this.posicion -= 1;
    if (this.posicion == 2) {
      this.listaProvicias();
    }
    this.cambioSteps(this.posicion);
    this.cambioDisplay(this.posicion);

  }
  listaProvicias() {
    this.bandasService.getProvincias().then((res) => {
      this.provinciaArray = res;

    }).catch((err) => {

    });
  }
  datosLocalidad(plocalidad) {
    // console.log(plocalidad.target.value)
    let arrayLocalidades = plocalidad.target.value.split(',')
    this.bandasService.getLocalidades(arrayLocalidades[0]).then((res) => {
      this.localidadArray = res;

    }).catch((err) => {

    });
    this.provincia = arrayLocalidades[1];
    this.formulario.value.provincia = arrayLocalidades[1];
    // this.formulario['provincia'] = arrayLocalidades[1];
  }
  datosLatLng(plocalidad) {
    let arrayLocalidades = plocalidad.target.value.split(',')
    this.localidad = arrayLocalidades[0];
    this.formulario.value.localidad = arrayLocalidades[0];
    // this.formulario['localidad'] = arrayLocalidades[0];
    this.latitud = parseFloat(arrayLocalidades[1]);
    this.longitud = parseFloat(arrayLocalidades[2]);
    this.formulario.value.provincia = this.provincia;
    this.formulario.value.localidad = this.localidad;
    this.formulario.value.lat = this.latitud;
    this.formulario.value.lng = this.longitud;
    this.latlng = { lat: this.latitud, lng: this.longitud }
  }

  subirDosier(valDosier) {
    if (valDosier) {
      const filePath = 'documentos/' + this.dosierO.name;
      const fileRef = this.storage.ref(filePath);
      const tarea = this.storage.upload(filePath, this.dosierO);

      tarea.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {


            this.formulario.value.dosier = url;
            this.formulario['dosier'] = filePath;
          })
        })
      ).subscribe()
    }
  }
  subirImagen(valImg, tipo) {
    if (valImg) {
      const filePath = 'imagenes/' + valImg.name;
      const fileRef = this.storage.ref(filePath);
      const tarea = this.storage.upload(filePath, valImg);
      // tarea.percentageChanges().subscribe(percent => {
      //   console.log(percent)
      // })
      // this.uploadPercentImagen = tarea.percentageChanges();

      tarea.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            if (tipo == 'imagen') {
              this.formulario.value.imagen = url;
              this.formulario['imagen'] = filePath;
            } else if (tipo == 'logo') {
              this.formulario.value.logo = url;
              this.formulario['logo'] = filePath;
            }
          })
        })
      ).subscribe()
    }
  }
  async tratarSubmit() {

    if (!this.formulario.valid) {
      this.control = true;
    } else {
      this.control = false;
      this.formulario.value.idUsuario = this.idUsuario;
      this.formulario.value.tipo = this.formulario.value.tipo.toString()
      this.formulario.value.redes = this.formulario.value.redes.toString()
      await this.subirImagen(this.imagenO, 'imagen');
      await this.subirImagen(this.logoO, 'logo');
      await this.subirDosier(this.dosierO);
      this.botonActivo = true;
      setTimeout(() => {
        this.enviarFormulario()
      }, 5000);

    }
  }
  enviarFormulario() {

    try {
      console.log('FORMULARIO ENVIADO: ', this.formulario.value)
      this.bandasService.addPerfil(this.formulario.value);
    } catch (err) {
      console.log(err)
    }
    this.ngRedux.dispatch({ type: UPDATE_LOGIN })
    this.router.navigate(['/cerrar']);
  }

}
