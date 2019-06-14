import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalasService {
  serverApi: string;
  constructor(private httpClient: HttpClient) {
    this.serverApi = 'http://localhost:3003/'
  }


  getRandomId() {
    return this.httpClient.get(this.serverApi + 'api/salas/getRandomId').toPromise();
  }

  addPerfil(perfil) {
    return this.httpClient.post(this.serverApi + 'api/salas/addPerfil', perfil).toPromise();
  }

  updPerfil(perfil) {
    return this.httpClient.post(this.serverApi + 'api/salas/updPerfil', perfil).toPromise();
  }

  getFichaSala(idSala) {
    return this.httpClient.get(this.serverApi + 'api/salas/getFichaSala/' + idSala).toPromise();
  }
  getAllSalas() {
    return this.httpClient.get(this.serverApi + 'api/salas/getAllSalas').toPromise();
  }
  getAllSalasPag(pagina) {
    return this.httpClient.post(this.serverApi + 'api/salas/getAllSalasPag', pagina).toPromise();
  }
  getFiltroSalas(datosFiltrar) {
    return this.httpClient.post(this.serverApi + 'api/salas/getFiltroSalas', datosFiltrar).toPromise();
  }


}

