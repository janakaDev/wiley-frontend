import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route
} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {AuthService} from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private storage: LocalStorageService,
    private router: Router,
    private auth: AuthService
  ) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.auth.currentUserAuthenticationToken$.value) {
      this.router.navigateByUrl('/dashboard');
      return false;
    }

    if (this.auth.isUserExist$.value) {
      return true;
    }

    // navigate to login page
    this.auth.clearLocalStorage();
    this.router.navigate(['']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
