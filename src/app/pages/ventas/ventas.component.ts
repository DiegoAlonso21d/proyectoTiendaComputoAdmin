import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;
import 'datatables.net';
import { event } from 'jquery';
import { GlobalConstants } from 'src/app/global.constans';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { SnackbarService } from 'src/app/services/snackbard/snackbar.service';
import { VentaService } from 'src/app/services/venta/venta.service';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
})
export class VentasComponent {
  manageOrderForm: any = FormGroup;
  categorias: any;
  facturas: any;
  productos: any;
  facturaSeleccionada: any;
  mostrarModal: boolean = false;
  precio: any;
  totalAmount: number = 0;
  detalleProductoFacturaSeleccionada: any;
  constructor(
    private productoService: ProductosService,
    private categoriaService: CategoriaService,
    private ventaService: VentaService,
    private snackbarService: SnackbarService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.getFacturas();
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

  getFacturas() {
    this.ventaService.getFactuas().subscribe(
      (response: any) => {
        this.facturas = response;
        console.log(this.facturas);
        this.initializeDataTable();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe(
      (response: any) => {
        this.categorias = response;
        console.log(this.categorias);
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

  eliminarVenta(factura: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Desea eliminar la factura  "${factura.uuid}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(
      (result: any) => {
        console.log(result.value);

        if (result.value == true) {
          this.ventaService.delete(factura.id).subscribe(
            (response: any) => {
              console.log(response);

              this.getFacturas();

              Swal.fire({
                title: 'Eliminado correctamente',
                text: ` "${factura.uuid}" ha sido eliminada correctamente.`,
                icon: 'success',
              });
            },
            (error: any) => {
              if (error.error) {
                this.showAlert(` "${factura.uuid}" no se puede eliminar.`);
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

  openDetalleModal(factura: any) {
    console.log(factura);
    this.facturaSeleccionada = factura;
    this.detalleProductoFacturaSeleccionada = JSON.parse(
      factura.detalleProducto
    );

    // Muestra el modal
    this.mostrarModal = true;
  }
  closeModal() {
    this.mostrarModal = false;
  }

  downloadFile(factura: any) {
    var data = {
      uuid: factura.uuid,
    };

    this.ventaService.getPdf(data).subscribe((response: any) => {
      saveAs(response, factura.uuid + '.pdf');
    });
  }
}
