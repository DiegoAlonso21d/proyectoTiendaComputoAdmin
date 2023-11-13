import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';

import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';

import { NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';

import { HttpClientModule } from '@angular/common/http';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: 'Cargando ... ',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  bgsColor: '#FEA700',
  fgsColor: '#FEA700',
  fgsType: SPINNER.squareJellyBox,
  fgsSize: 100,
  hasProgressBar: false,
};

@NgModule({
  declarations: [AppComponent, NopagefoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    SharedModule,
    AuthModule,
    RouterModule,
    HttpClientModule,

    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
