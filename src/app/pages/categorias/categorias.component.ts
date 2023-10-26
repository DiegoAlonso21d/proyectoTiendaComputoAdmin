import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { SnackbarService } from 'src/app/services/snackbard/snackbar.service';
import { Router } from '@angular/router';

import { GlobalConstants } from 'src/app/global.constans';
import { Component, AfterViewInit  } from '@angular/core';
declare var $: any;
import 'datatables.net';

// MODAL crear
document.addEventListener('DOMContentLoaded', function () {
  const openModalBtn = document.getElementById('openModalBtn');
  const modal = document.getElementById('myModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (openModalBtn) {
    openModalBtn.addEventListener('click', function () {
      if (modal) {
        modal.style.display = 'block';
      }
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function () {
      if (modal) {
        modal.style.display = 'none';
      }
    });
  }
});
// FINAL DEL MODAL


// modal actualizar
document.addEventListener('DOMContentLoaded', function () {
  const openModalEditBtn = document.getElementById('openModalEdit');
  const editModal = document.getElementById('editModal');
  const closeEditModalBtn = document.getElementById('closeEditModal');

  if (openModalEditBtn && editModal && closeEditModalBtn) {
    openModalEditBtn.addEventListener('click', function () {
      editModal.style.display = 'block';
    });

    closeEditModalBtn.addEventListener('click', function () {
      editModal.style.display = 'none';
    });
  }
});

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})

export class CategoriasComponent implements AfterViewInit  {

  constructor() {}

  ngAfterViewInit(): void {
    $(document).ready(function () {
      $('#myTable').DataTable({
        scrollX: true,
        responsive: true,
        language: {
          url: "https://cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json"
        }
      });
    });
  }
/* 
  ngOnInit(): void {
    this.ngxService.start();

    this.tableData();
  } */

/*   tableData() {
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
  } */

/*   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const filter: any = {
      filterValue: filterValue.trim().toLowerCase(),
    };

  

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
  } */

  handleEditAction(data: any) {}
}
