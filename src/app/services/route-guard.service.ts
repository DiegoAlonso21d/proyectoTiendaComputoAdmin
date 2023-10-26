import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from './snackbard/snackbar.service';
import jwtDecode from 'jwt-decode';
import { GlobalConstants } from '../global.constans';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService {
  constructor(
    public authService: AuthService,
    public router: Router,
    private snackbarService: SnackbarService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let expectatedRolArray = route.data;
    expectatedRolArray = expectatedRolArray['expectedRole'];

    const token: any = localStorage.getItem('token');

    var tokenPayload: any;

    try {
      tokenPayload = jwtDecode(token);
    } catch (err) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }

    let expectedRole = '';

    for (let i = 0; i < expectatedRolArray['length']; i++) {
      if (expectatedRolArray[i] == tokenPayload.role) {
        expectedRole = tokenPayload.role;
      }
    }

    if (
      tokenPayload.role == 'usuario' ||
      tokenPayload.role == 'administrador'
    ) {
      if (
        this.authService.isAuthenticated() &&
        tokenPayload.role == expectedRole
      ) {
        return true;
      }

      this.snackbarService.showSnackbar(
        GlobalConstants.unauthorized,
        GlobalConstants.error
      );
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
