import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/global.constans';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { SnackbarService } from 'src/app/services/snackbard/snackbar.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  responseMessage: any;
  data: any;
  token = localStorage.getItem('token');

  constructor(
    private dashboardService: DashboardService,
    private usuarioService: UsuariosService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) {
    this.ngxService.start();
    this.dashboardData();
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    // this.checkToken();
  }

  checkToken() {
    this.usuarioService.checkToken().subscribe(
      (response: any) => {
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  dashboardData() {
    this.dashboardService.getDetails(this.token!).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.data = response;
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }

        this.snackbarService.showSnackbar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }
}
