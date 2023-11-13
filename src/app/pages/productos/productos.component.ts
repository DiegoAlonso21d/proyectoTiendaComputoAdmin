import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;
import 'datatables.net';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { SnackbarService } from 'src/app/services/snackbard/snackbar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent {
  productos: any;
  categorias: any;
  selectedProducto: any = { id: '', nombre: '' };
  showModalAdd: boolean = false; // Para controlar la visibilidad del modal
  showModal: boolean = false; // Para controlar la visibilidad del modal
  selectedCategoryId: number | null = null; // Para almacenar el id de la categoría seleccionada
  selectedCategoryName: string = '';
  tableInitialized: boolean = false;
  mostrarModal: boolean = false;
  mostrarModalAdd: boolean = false;
  productoForm: any = FormGroup;
  editForm: any = FormGroup;
  productoSeleccionada: any;

  constructor(
    private productoService: ProductosService,
    private categoriaService: CategoriaService,
    private snackbarService: SnackbarService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.tableData();

    this.addProductoForm();
    this.editProductoForm();
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe((response: any) => {
      console.log(response);
      this.categorias = response;
    });
  }

  addProductoForm() {
    this.productoForm = this.formBuilder.group({
      nombre: [null, [Validators.required]],
      image: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      precio: [null, [Validators.required]],
      stock: [null, [Validators.required]],
      categoria_id: [0, [Validators.required]],
    });
  }

  editProductoForm() {
    this.editForm = this.formBuilder.group({
      id: [null, [Validators.required]],
      nombre: [null, [Validators.required]],
      image: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      precio: [null, [Validators.required]],
      stock: [null, [Validators.required]],
      categoria_id: [0, [Validators.required]],
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
    this.productoService.getProductos().subscribe((response: any) => {
      console.log(response);
      this.productos = response;
      this.initializeDataTable();
    });
  }

  // Método para abrir el modal de edición
  openAddModal() {
    // Muestra el modal
    this.mostrarModalAdd = true;
  }

  // Método para abrir el modal de edición
  openEditModal(producto: any) {
    console.log(producto);
    this.productoSeleccionada = producto;

    this.editForm = this.formBuilder.group({
      id: [producto.id, [Validators.required]],
      nombre: [producto.nombre, [Validators.required]],
      image: [producto.image, [Validators.required]],
      descripcion: [producto.descripcion, [Validators.required]],
      precio: [producto.precio, [Validators.required]],
      stock: [producto.stock, [Validators.required]],
      categoria_id: [producto.categoria_id, [Validators.required]],
    });

    // Muestra el modal
    this.mostrarModal = true;
  }

  validateAddProducto() {
    if (!this.productoForm.get('nombre').value) {
      this.showAlert('El campo Nombre no debe estar vacío');
      return;
    }

    if (!this.productoForm.get('image').value) {
      this.showAlert('El campo Imagen no debe estar vacío');
      return;
    }

    if (!this.productoForm.get('descripcion').value) {
      this.showAlert('El campo Descripción no debe estar vacío');
      return;
    }
    if (!this.productoForm.get('stock').value) {
      this.showAlert('El campo Stock no debe estar vacío');
      return;
    }

    if (!this.productoForm.get('precio').value) {
      this.showAlert('El campo Precio no debe estar vacío');
      return;
    }

    if (this.productoForm.get('categoria_id').value === 0) {
      this.showAlert('Seleccione una categoría');
      return;
    }

    // Si todas las validaciones pasan, llamar a la función para agregar el producto
    this.addProducto();
  }

  validateEditProductoa() {
    if (!this.editForm.get('nombre').value) {
      this.showAlert('El campo Nombre no debe estar vacío');
      return;
    }

    if (!this.editForm.get('image').value) {
      this.showAlert('El campo Imagen no debe estar vacío');
      return;
    }

    if (!this.editForm.get('descripcion').value) {
      this.showAlert('El campo Descripción no debe estar vacío');
      return;
    }
    if (!this.editForm.get('stock').value) {
      this.showAlert('El campo Stock no debe estar vacío');
      return;
    }

    if (!this.editForm.get('precio').value) {
      this.showAlert('El campo Precio no debe estar vacío');
      return;
    }

    if (this.editForm.get('categoria_id').value === 0) {
      this.showAlert('Seleccione una categoría');
      return;
    }

    // Si todas las validaciones pasan, llamar a la función para agregar el producto
    this.actualizarProducto();
  }

  actualizarProducto() {
    var formData = this.editForm.value;

    var data = {
      id: formData.id,
      nombre: formData.nombre,
      categoria_id: formData.categoria_id,
      descripcion: formData.descripcion,
      precio: formData.precio,
      image: formData.image,
      stock: formData.stock,
    };

    this.productoService.update(data).subscribe((response: any) => {
      console.log(response);

      this.snackbarService.showSnackbar(
        'Producto actualizado correctamente',
        'Exito'
      );
      this.tableData();
    });
  }

  addProducto() {
    var formData = this.productoForm.value;

    var data = {
      nombre: formData.nombre,
      categoria_id: formData.categoria_id,
      descripcion: formData.descripcion,
      precio: formData.precio,
      image: formData.image,
      stock: formData.stock,
    };

    if ($('#myTable').DataTable().destroy()) {
      $('#myTable').DataTable().destroy();

      this.productoService.add(data).subscribe((response: any) => {
        this.snackbarService.showSnackbar('Producto agregado', 'Exito');
        console.log(response);
        this.tableData();
      });
    }
  }

  cambiarEstado(event: any, producto: any) {
    const isChecked = event.target.checked;

    var dataActivado = {
      estado: 'true',
      id: producto.id,
    };

    var dataDesactivado = {
      estado: 'false',
      id: producto.id,
    };

    if ($('#myTable').DataTable().destroy()) {
      $('#myTable').DataTable().destroy();

      if (isChecked) {
        this.productoService
          .updateStatus(dataActivado)
          .subscribe((response: any) => {
            this.snackbarService.showSnackbar('Producto Activado', 'Exito');
            console.log(response);
            this.tableData();
          });
      } else {
        this.productoService
          .updateStatus(dataDesactivado)
          .subscribe((response: any) => {
            this.snackbarService.showSnackbar('Producto Desactivado', 'Exito');
            console.log(response);
            this.tableData();
          });
      }
    }
  }

  // Elimina la categoria
  eliminarProducto(producto: any) {
    // Muestra un mensaje de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Desea eliminar el Producto "${producto.nombre}"?`,
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
          this.productoService.deleteProducto(producto).subscribe(
            (response: any) => {
              console.log(response);

              this.tableData();

              Swal.fire({
                title: 'Eliminado correctamente',
                text: `El producto "${producto.nombre}" ha sido eliminada correctamente.`,
                icon: 'success',
              });
            },
            (error: any) => {
              if (error.error) {
                this.showAlert(
                  `El producto "${producto.nombre}" esta relacionada a un producto.`
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
    this.mostrarModalAdd = false;
    this.mostrarModal = false;
  }
}
