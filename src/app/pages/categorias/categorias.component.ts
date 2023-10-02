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
  styleUrls: ['./categorias.component.css']
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

}
