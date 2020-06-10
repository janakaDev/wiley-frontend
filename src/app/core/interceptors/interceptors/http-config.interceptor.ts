import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable()
export class HttpConfigInterceptorService implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router,
    private storage: LocalStorageService,
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const identifier = _.last(req.url.split('/'));
    switch (identifier) {
      case 'login':
      case 'confirm':
      case 'signup':
      case 'reset_password':
        req = req.clone({
          setHeaders: {
            'Content-Type': 'application/json'
          }
        });
        return next.handle(req);

      case 'refresh':
        req = req.clone({
          setHeaders: {
            'Content-Type': 'application/json'
          }
        });
        return next.handle(req).do(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              event = event.clone({ body: event.body });
              return event;
            }
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse) {
              this.auth.clearLocalStorage();
              this.router.navigateByUrl('/dashboard/login');
            }
          }
        );
      default:
        req = req.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.storage.retrieve('token')}`
          }
        });
        return next.handle(req).do(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              return event;
            }
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 401) {
                this.auth.clearLocalStorage();
                this.router.navigateByUrl('/dashboard/login');
              }
            }
          }
        );
    }
  }
}
