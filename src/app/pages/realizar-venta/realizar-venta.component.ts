import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;
import 'datatables.net';
import { event } from 'jquery';

import { map, mapTo } from 'rxjs';
import { GlobalConstants } from 'src/app/global.constans';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { SnackbarService } from 'src/app/services/snackbard/snackbar.service';
import { VentaService } from 'src/app/services/venta/venta.service';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-realizar-venta',
  templateUrl: './realizar-venta.component.html',
  styleUrls: ['./realizar-venta.component.css'],
})
export class RealizarVentaComponent {
  manageOrderForm: any = FormGroup;
  categorias: any;
  productos: any;

  productosEnCarrito: any = [];
  productoSeleccionado: any;
  precio: any;
  totalAmount: any = 0;
  constructor(
    private productoService: ProductosService,
    private categoriaService: CategoriaService,
    private snackbarService: SnackbarService,
    private ventasService: VentaService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.getCategorias();
    /*   this.getProductoPorCategoria(30); */
    this.addManageOrder();
  }

  addManageOrder() {
    this.manageOrderForm = this.formBuilder.group({
      nombre: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
      telefono: [
        null,
        [
          Validators.required,
          Validators.pattern(GlobalConstants.contactNumberRegex),
        ],
      ],
      productoSeleccionado: [0, [Validators.required]],
      metodoPago: [null, [Validators.required]],
      total: [this.totalAmount, [Validators.required]],
      detalleProducto: [this.productosEnCarrito, [Validators.required]],
    });
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

  getProductoPorCategoria(event: any) {
    console.log(event.target.value);

    let id = event.target.value;

    this.productoService
      .getProductoPorCategoria(id)
      .pipe(
        map((response: any) => {
          console.log(response);

          this.productos = response;
        })
      )
      .subscribe();
  }

  getProductDetails(event: any) {
    let id = event.target.value;

    console.log(id);

    this.productoService.getById(id).subscribe(
      (response: any) => {
        console.log(response);

        this.precio = response.precio;

        this.productoSeleccionado = response[0];
        console.log(this.productoSeleccionado);
        /*     this.manageOrderForm.controls['precio'].setValue(response.precio);
        this.manageOrderForm.controls['cantidad'].setValue('1');
        this.manageOrderForm.controls['total'].setValue(this.precio * 1); */
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  validateSubmit() {
    if (!this.manageOrderForm.get('nombre').value) {
      this.showAlert('El campo Nombre no debe estar vacío');
      return;
    }
    if (!this.manageOrderForm.get('email').value) {
      this.showAlert('El campo Imagen no debe estar vacío');
      return;
    }

    if (!this.manageOrderForm.get('telefono').value) {
      this.showAlert('El campo Imagen no debe estar vacío');
      return;
    }

    if (!this.manageOrderForm.get('metodoPago').value) {
      this.showAlert('El campo Descripción no debe estar vacío');
      return;
    }

    this.submitAction();
  }

  add() {
    var formData = this.manageOrderForm.value;
  }

  submitAction() {
    var formData = this.manageOrderForm.value;
    var data = {
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      metodoPago: formData.metodoPago,
      total: this.totalAmount,
      detalleProducto: JSON.stringify(this.productosEnCarrito),
    };

    this.ventasService.generateReport(data).subscribe((response: any) => {
      this.snackbarService.showSnackbar(
        'Factura creada correctamente',
        'Exito'
      );

      this.downloadFile(response?.uuid);
      this.manageOrderForm.reset();
      this.totalAmount = 0;
    });
  }

  downloadFile(fileName: string) {
    var data = {
      uuid: fileName,
    };

    this.ventasService.getPdf(data).subscribe((response: any) => {
      saveAs(response, fileName + '.pdf');
    });
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

  calcularTotal() {
    // Itera sobre el arreglo de productos

    this.totalAmount = 0;

    for (const producto of this.productosEnCarrito) {
      // Calcula el total del producto
      const totalProducto = producto.cantidad * producto.precio;

      // Agrega el total del producto al totalAmount
      this.totalAmount += totalProducto;

      console.log(this.totalAmount);
    }
  }
  addCarrito(producto: any) {
    // Verifica si el producto ya está en el carrito
    const existeProducto = this.productosEnCarrito.find(
      (p: any) => p.id === producto.id
    );

    // Si el producto ya está en el carrito, actualiza la cantidad
    if (existeProducto) {
      existeProducto.cantidad++;
    } else {
      // Si el producto no está en el carrito, lo agrega
      this.productoSeleccionado = {
        cantidad: 1,

        ...producto,
      };

      this.productosEnCarrito.push(this.productoSeleccionado);
    }

    this.calcularTotal();
    console.log(this.productoSeleccionado);
    console.log('Productos en carrito:  ', this.productosEnCarrito);
  }

  quitarDelCarrito(index: number) {
    this.productosEnCarrito.splice(index, 1);
  }
}
