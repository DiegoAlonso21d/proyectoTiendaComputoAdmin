import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RealizarVentaComponent } from './realizar-venta/realizar-venta.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductosComponent } from './productos/productos.component';
import { VentasComponent } from './ventas/ventas.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ChangePasswordComponent } from './changePassword/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,

    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'realizarVenta', component: RealizarVentaComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'ventas', component: VentasComponent },
      { path: 'changePassword', component: ChangePasswordComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
    /*     canActivate: [RouteGuardService],
    data: {
      expectedRole: ['administrador', 'usuario'],
    }, */
  },

  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
