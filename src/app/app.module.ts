import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DefaultModule} from './layouts/default/default.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptorService} from './core/interceptors/interceptors/auth-interceptor.service';
import {TokenService} from '../common/token.service';
import {AuthService} from './core/services/auth/auth.service';
import {WelcomeModule} from './modules/welcome/welcome.module';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {ToastrModule} from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import {MaterialModule} from './shared/material';
import {LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    DefaultModule,
    WelcomeModule,
    LoadingBarHttpClientModule,
    ToastrModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    MaterialModule
  ],
  providers: [
    TokenService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
