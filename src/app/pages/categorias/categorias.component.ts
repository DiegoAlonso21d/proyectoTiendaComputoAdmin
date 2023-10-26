import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { SnackbarService } from 'src/app/services/snackbard/snackbar.service';
import { Router } from '@angular/router';

import { GlobalConstants } from 'src/app/global.constans';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent {
  displayColumns: string[] = ['nombre', 'edit'];
  dataSource: any;
  responseMessage: any;
  constructor(
    private categoriaSerivce: CategoriaService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ngxService.start();

    this.tableData();
  }

  tableData() {
    this.categoriaSerivce.getCategorias().subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dataSource = response;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const filter: any = {
      filterValue: filterValue.trim().toLowerCase(),
    };

    /*     if (!filter) {
      this.tableData();
      return;
    } */

    this.categoriaSerivce.getCategoriasFiltro(filter).subscribe(
      (response: any) => {
        console.log(response);
        this.ngxService.stop();
        this.dataSource = response;
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

  handleEditAction(data: any) {}
}
