import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  serverApi: string;
  constructor(private httpClient: HttpClient) {
    this.serverApi = 'http://localhost:3003/'
  }

  registro(datosRegistro) {
    return this.httpClient.post(this.serverApi + 'api/usuarios/registro', datosRegistro).toPromise();
  }
  // getUsuarios() {
  //   return this.httpClient.get(this.serverApi + 'api/getAllUsers').toPromise();
  // }
}
