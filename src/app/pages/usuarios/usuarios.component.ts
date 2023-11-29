import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
import 'datatables.net';
import { SnackbarService } from 'src/app/services/snackbard/snackbar.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent {
  usuarios: any;

  constructor(
    private usuarioService: UsuariosService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tableData();
  }

  initializeDataTable(): void {
    if ($.fn.DataTable.isDataTable('#myTable')) {
      $('#myTable').DataTable().destroy();
    }

    $(document).ready(function () {
      $('#myTable').DataTable({
        scrollX: true,
        responsive: true,
        language: {
          url: 'https://cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json',
        },
      });
    });
  }
  tableData() {
    this.usuarioService.getUsuarios().subscribe((response: any) => {
      console.log(response);
      this.usuarios = response;
      this.initializeDataTable();
    });
  }

  cambiarEstado(event: any, usuario: any) {
    const isChecked = event.target.checked;

    var dataActivado = {
      estado: 'true',
      id: usuario.id,
    };

    var dataDesactivado = {
      estado: 'false',
      id: usuario.id,
    };

    if ($('#myTable').DataTable().destroy()) {
      $('#myTable').DataTable().destroy();

      if (isChecked) {
        this.usuarioService
          .updateStatus(dataActivado)
          .subscribe((response: any) => {
            this.snackbarService.showSnackbar('Usuario Activado', 'Exito');
            console.log(response);
            this.tableData();
          });
      } else {
        this.usuarioService
          .updateStatus(dataDesactivado)
          .subscribe((response: any) => {
            this.snackbarService.showSnackbar('Usuario Desactivado', 'Exito');
            console.log(response);
            this.tableData();
          });
      }
    }
  }
}
