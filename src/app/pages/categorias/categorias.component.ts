import { Component, AfterViewInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;
import 'datatables.net';
import { error } from 'jquery';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { SnackbarService } from 'src/app/services/snackbard/snackbar.service';
import Swal from 'sweetalert2';

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
export class CategoriasComponent {
  categorias: any;

  selectedCategory: any = { id: '', nombre: '' };

  showModal: boolean = false; // Para controlar la visibilidad del modal
  selectedCategoryId: number | null = null; // Para almacenar el id de la categoría seleccionada
  selectedCategoryName: string = '';
  tableInitialized: boolean = false;
  mostrarModal: boolean = false;
  categoriaForm: any = FormGroup;
  editForm: any = FormGroup;
  categoriaSeleccionada: any;

  constructor(
    private categoriaService: CategoriaService,
    private snackbarService: SnackbarService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.tableData();
    this.addCategoriaForm();
    this.editCategoriaForm();
  }

  addCategoriaForm() {
    this.categoriaForm = this.formBuilder.group({
      nombre: [null, [Validators.required]],
    });
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
    this.categoriaService.getCategorias().subscribe((response: any) => {
      console.log(response);
      this.categorias = response;
      this.initializeDataTable();
    });
  }

  validateAddCategoria() {
    if (!this.categoriaForm.valid) {
      this.showAlert('El nombre es obligatorio');

      return;
    }

    this.addCategoria();
  }

  validateEditCategoria() {
    if (!this.editForm.valid) {
      this.showAlert('El nombre es obligatorio');

      return;
    }

    this.actualizarCategorias();
  }

  addCategoria() {
    var formData = this.categoriaForm.value;

    var data = {
      nombre: formData.nombre,
    };

    if ($('#myTable').DataTable().destroy()) {
      $('#myTable').DataTable().destroy();
    }

    this.categoriaService.add(data).subscribe((response: any) => {
      this.snackbarService.showSnackbar('Categoria agregada', 'Exito');
      console.log(response);
      this.tableData();
    });
  }

  editCategoriaForm() {
    this.editForm = this.formBuilder.group({
      id: [null, [Validators.required]],
      nombre: [null, [Validators.required]],
    });
  }

  // Método para abrir el modal de edición
  openEditModal(categoria: any) {
    console.log(categoria);
    this.categoriaSeleccionada = categoria;

    this.editForm = this.formBuilder.group({
      id: [categoria.id, [Validators.required]],
      nombre: [categoria.nombre, [Validators.required]],
    });

    // Muestra el modal
    this.mostrarModal = true;
  }

  // Método para cerrar el modal de edición

  // Actualiza la categoria
  actualizarCategorias() {
    var formData = this.editForm.value;

    var data = {
      id: formData.id,
      nombre: formData.nombre,
    };

    this.categoriaService.update(data).subscribe((response: any) => {
      console.log(response);

      this.snackbarService.showSnackbar(
        'Categoria actualizada correctamente',
        'Exito'
      );
      this.tableData();
    });
  }

  // Elimina la categoria
  eliminarCategoria(categoria: any) {
    // Muestra un mensaje de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Desea eliminar la categoría "${categoria.nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(
      (result) => {
        if (result.value) {
          // Elimina la categoria
          this.categoriaService.deleteCategoria(categoria).subscribe(
            (response: any) => {
              console.log(response);

              this.tableData();

              Swal.fire({
                title: 'Eliminado correctamente',
                text: `La categoría "${categoria.nombre}" ha sido eliminada correctamente.`,
                icon: 'success',
              });
            },
            (error: any) => {
              if (error.error) {
                this.showAlert(
                  `La categoría "${categoria.nombre}" esta relacionada a un producto.`
                );
              }
            }
          );
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  showAlert(message: string) {
    // Puedes usar cualquier librería de alertas que desees, como SweetAlert2 o Toastr
    // Aquí hay un ejemplo de cómo usar SweetAlert2
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
    });
  }

  closeModal() {
    this.mostrarModal = false;
  }
}
