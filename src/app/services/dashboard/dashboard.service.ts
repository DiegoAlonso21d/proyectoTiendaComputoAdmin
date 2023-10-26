import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  url = enviroment.apiUrl;

  constructor(private httpClient: HttpClient) {}
  
  getDetails(token: string) {
    // Verifica si se ha obtenido un token
    if (token) {
      console.log(token);

      // Crea un objeto HttpHeaders y agrega el token como un encabezado "Authorization"
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`, // Usar la sintaxis "Bearer" seguida del token
      });

      // Ahora realiza la solicitud HTTP con los encabezados configurados
      return this.httpClient.get(this.url + '/dashboard/details', { headers });
    } else {
      console.log(token);
      // Manejo de errores si el token no está disponible
      // Puedes redirigir al usuario a iniciar sesión o realizar alguna otra acción
      console.error('Token de autenticación no disponible.');
      // Puedes lanzar un error o retornar un Observable que maneje el error
      return throwError('Token de autenticación no disponible.');
    }
  }
}
