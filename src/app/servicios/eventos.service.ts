import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  serverApi: string;
  constructor(private httpClient: HttpClient) {
    this.serverApi = 'http://localhost:3003/'
  }

  getRandomId() {
    return this.httpClient.get(this.serverApi + 'api/eventos/getRandomId').toPromise();
  }
  newEvent(evento) {
    return this.httpClient.post(this.serverApi + 'api/eventos/newEvent', evento).toPromise();
  }
  getFiltroEventos(fecha) {
    return this.httpClient.post(this.serverApi + 'api/eventos/getFiltroEventos', fecha).toPromise();
  }

}
