import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  url = enviroment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  signup(data: any) {
    return this.httpClient.post(this.url + '/usuarios/register', data, {
      headers: new HttpHeaders().set('Conent-Type', 'application/json'),
    });
  }

  login(data: any) {
    return this.httpClient.post(this.url + '/usuarios/login', data, {
      headers: new HttpHeaders().set('Conent-Type', 'application/json'),
    });
  }

  checkToken() {
    return this.httpClient.get(this.url + '/usuarios/checkToken');
  }

  changePassword(data: any) {
    return this.httpClient.post(this.url + '/usuarios/changePassword', data, {
      headers: new HttpHeaders().set('Conent-Type', 'application/json'),
    });
  }
}
