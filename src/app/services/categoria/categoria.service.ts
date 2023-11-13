import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  url = enviroment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  add(data: any) {
    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post(this.url + '/categorias/add', data, {
      headers,
    });
  }

  update(data: any) {
    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post(this.url + '/categorias/update', data, {
      headers,
    });
  }

  getCategorias() {
    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(this.url + '/categorias/get', { headers });
  }

  deleteCategoria(categoria: any) {
    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post(
      this.url + `/categorias/delete/${categoria.id}`,
      categoria,
      {
        headers,
      }
    );
  }
}
