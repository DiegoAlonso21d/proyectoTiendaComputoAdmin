import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroments';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  url = enviroment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  add(data: any) {
    return this.httpClient.post(this.url + '/categorias/add', data, {
      headers: new HttpHeaders().set('Conent-Type', 'application/json'),
    });
  }

  update(data: any) {
    return this.httpClient.post(this.url + '/categorias/update', data, {
      headers: new HttpHeaders().set('Conent-Type', 'application/json'),
    });
  }

  getCategorias() {
    return this.httpClient.get(this.url + '/categorias/get');
  }

  getCategoriasFiltro(filterValue: any) {
    return this.httpClient.get(this.url + '/categorias/get', {
      params: {
        filterValue: filterValue,
      },
    });
  }
}
