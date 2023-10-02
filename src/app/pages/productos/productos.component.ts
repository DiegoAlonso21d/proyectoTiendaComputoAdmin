import { Component, AfterViewInit } from '@angular/core';
declare var $: any;
import 'datatables.net';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements AfterViewInit  {

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
