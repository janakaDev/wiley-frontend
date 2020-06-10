import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {AuthService} from '../../services/auth/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private store: LocalStorageService,
    private router: Router
  ) {}

  /**
   * Interceptor method to handle request calls and
   * avoid 401 case to refresh token
   * @returns Observable
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const identifier = _.last(req.url.split('/'));
    switch (identifier) {
      case 'login':
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
              this.router.navigateByUrl('/dashboard');
            }
          }
        );

      default:
        req = req.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
              this.auth.currentUserAuthenticationToken$.value
            }`
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
              this.router.navigateByUrl('/dashboard');
            }
          }
        );
    }
  }
}
