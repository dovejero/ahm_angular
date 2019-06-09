import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  serverApi: string;
  constructor(private httpClient: HttpClient) {
    this.serverApi = 'http://localhost:3003/'
  }

  addPerfil(perfil) {
    return this.httpClient.post(this.serverApi + 'api/usuarios/addPerfil', perfil).toPromise();
  }
}
