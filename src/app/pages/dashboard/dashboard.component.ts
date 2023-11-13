import { Component } from '@angular/core';
import { GlobalConstants } from 'src/app/global.constans';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { SnackbarService } from 'src/app/services/snackbard/snackbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  data: any;

  constructor(
    private dashboardService: DashboardService,
    private snackbarService: SnackbarService
  ) {
    this.dashboardData();
  }

  dashboardData() {
    this.dashboardService.getDetails().subscribe(
      (response: any) => {
        this.data = response;
      },
      (error: any) => {
        console.log(error);

        this.snackbarService.showSnackbar(
          error.error.mssage,
          GlobalConstants.error
        );
      }
    );
  }
}
