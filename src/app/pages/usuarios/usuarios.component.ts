import { Component, AfterViewInit } from '@angular/core';
declare var $: any;
import 'datatables.net';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements AfterViewInit{
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

}
