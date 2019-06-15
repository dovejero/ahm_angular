import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BandasService {
  serverApi: string;
  constructor(private httpClient: HttpClient) {
    this.serverApi = 'http://localhost:3003/'
  }
  getRandomId() {
    return this.httpClient.get(this.serverApi + 'api/bandas/getRandomId').toPromise();
  }
  getProvincias() {
    return this.httpClient.get(this.serverApi + 'api/bandas/getProvincias').toPromise();
  }
  getLocalidades(pidProvincia) {
    let provincia = { idProvincia: pidProvincia }
    return this.httpClient.post(this.serverApi + 'api/bandas/getLocalidades', provincia).toPromise();
  }
  addPerfil(perfil) {
    return this.httpClient.post(this.serverApi + 'api/bandas/addPerfil', perfil).toPromise();
  }
  updPerfil(perfil) {
    return this.httpClient.put(this.serverApi + 'api/bandas/updPerfil', perfil).toPromise();
  }

  getFichaBanda(idSala) {
    return this.httpClient.get(this.serverApi + 'api/bandas/getFichaBanda/' + idSala).toPromise();
  }
  getFiltroBandas(datosFiltrar) {
    return this.httpClient.post(this.serverApi + 'api/bandas/getFiltroBandas', datosFiltrar).toPromise();
  }
}