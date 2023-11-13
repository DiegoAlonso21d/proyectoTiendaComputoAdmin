import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  url = enviroment.apiUrl;

  constructor(private httpClient: HttpClient, private router: Router) {}

  validarToken() {
    // Configurar el encabezado con el token

    const token = localStorage.getItem('token')!;

    let params = new HttpParams().set('x-token', token);

    return this.httpClient.get(`${this.url}/dashboard/isTokenValid`, {
      params: params,
    });
  }

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
    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post(this.url + '/usuarios/changePassword', data, {
      headers,
    });
  }
}
