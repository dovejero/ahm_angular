import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BandasService {

  constructor(private httpClient: HttpClient) {
  }
}
