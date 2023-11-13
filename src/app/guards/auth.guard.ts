import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { UsuariosService } from '../services/usuarios/usuarios.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private usuarioService: UsuariosService, private r: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('Paso por el auth guard');

    const token = localStorage.getItem('token');
    console.log(token);

    return this.usuarioService.validarToken().pipe(
      map((resp: any) => {
        console.log('Respuesta', resp);
        if (resp == true) {
          return true;
        } else if (token != null || token != '') {
          return true;
        } else {
          this.r.navigateByUrl('/login');
          return true;
        }
      })
    );
  }
}
