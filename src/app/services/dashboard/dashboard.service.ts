import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { enviroment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  url = enviroment.apiUrl;

  constructor(private httpClient: HttpClient, private router: Router) {}

  getDetails() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get(this.url + '/dashboard/details', { headers });
  }
}
