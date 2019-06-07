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
}