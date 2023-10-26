import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasComponent } from './categorias/categorias.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductosComponent } from './productos/productos.component';
import { RealizarVentaComponent } from './realizar-venta/realizar-venta.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VentasComponent } from './ventas/ventas.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { AppModule } from '../app.module';
import { ChangePasswordComponent } from './changePassword/change-password.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PagesComponent,
    CategoriasComponent,
    DashboardComponent,
    ProductosComponent,
    RealizarVentaComponent,
    UsuariosComponent,
    VentasComponent,
    ChangePasswordComponent,
  ],
  exports: [
    PagesComponent,
    CategoriasComponent,
    DashboardComponent,
    ProductosComponent,
    RealizarVentaComponent,
    UsuariosComponent,
    VentasComponent,
    ChangePasswordComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule, ReactiveFormsModule],
})
export class PagesModule {}
