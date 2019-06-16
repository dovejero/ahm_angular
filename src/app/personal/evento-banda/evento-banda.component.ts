import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { SalasService } from '../../servicios/salas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from '../../servicios/util.service';
import { EventosService } from '../../servicios/eventos.service';

@Component({
  selector: 'app-evento-banda',
  templateUrl: './evento-banda.component.html',
  styleUrls: ['./evento-banda.component.css']
})
export class EventoBandaComponent implements OnInit {

  @Input() objPerfil: any;

  pathImagen
  imgURL: any;

  formulario: FormGroup;
  botonActivo: boolean;
  control: boolean;
  uploadPercentImagen: Observable<number>
  uploadPercentDosier: Observable<number>
  imagenO: any;
  salas: any;
  newFecha: any;

  constructor(private storage: AngularFireStorage, private salasService: SalasService, private router: Router, private activatedRoute: ActivatedRoute, private utilService: UtilService, private eventosService: EventosService) {

    this.imgURL = ''

    this.control = false;
    this.botonActivo = false;

  }

  ngOnInit() {
    this.salas = []
    this.imgURL = '';
    this.formulario = new FormGroup({
      nombre: new FormControl('', [
      ]),
      fk_sala: new FormControl('', [
      ]),
      fk_banda: new FormControl('', [
      ]),
      info: new FormControl('', [
      ]),
      precio: new FormControl('', [
      ]),
      year: new FormControl('', [
      ]),
      month: new FormControl('', [
      ]),
      day: new FormControl('', [
      ]),
      imagen: new FormControl('', [
      ]),
    })
    this.getSalas();
  }
  cambioFecha(e) {
    console.log('FECHA: ', e);
    this.newFecha = e;
  }

  getSalas() {
    this.salasService.getAllSalasForm().then((result) => {
      console.log(result)
      this.salas = result;
    }).catch((error) => {

    })
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
  subirImagen(valImg, tipo) {
    console.log(valImg)
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
            console.log('URL: ', url);
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
      await this.subirImagen(this.imagenO, 'imagen');
      this.formulario.value['fk_banda'] = this.utilService.getIdUsuario();
      this.formulario.value.year = this.newFecha.year;
      this.formulario.value.month = this.newFecha.month;
      this.formulario.value.day = this.newFecha.day;
      console.log(this.formulario.value);
      this.botonActivo = true;
      setTimeout(() => {
        this.enviarFormulario()
      }, 5000);

    }
  }

  enviarFormulario() {
    this.eventosService.newEvent(this.formulario.value).then((res) => {
      this.botonActivo = false;
      console.log(res)
    }).catch((err) => {
      console.log(err)
      this.botonActivo = false;
    })
  }

}
