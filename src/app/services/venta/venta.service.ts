import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  url = enviroment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  generateReport(data: any) {
    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post(this.url + '/facturas/generateReport', data, {
      headers,
    });
  }

  getPdf(data: any): any {
    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.post(this.url + '/facturas/getPdf', data, {
      headers,
      responseType: 'blob',
    });
  }

  getFactuas() {
    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get(this.url + '/facturas/getFacturas', { headers });
  }

  delete(id: any) {
    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const data = {};
    return this.httpClient.post(this.url + `/facturas/delete/ ${id}`, data, {
      headers,
    });
  }
}
