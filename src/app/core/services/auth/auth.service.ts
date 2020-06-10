import {Injectable, Injector} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as CONST from '../../../../common/Constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isUserExist$ = new BehaviorSubject<boolean>(this.hasAccessToken());
  public userEmail$ = new BehaviorSubject<string>(this.getEmail());
  public userName$ = new BehaviorSubject<string>(this.getUserName());
  public previousUrl$ = new BehaviorSubject<string>('');
  public returnToPrevious$ = new BehaviorSubject<boolean>(false);
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userType$ = new BehaviorSubject<string>(
    this.getCurrentUserTypeFromLocalStorage()
  );

  public currentUserAuthenticationToken$ = new BehaviorSubject<string>(
    this.getCurrentUserAuthenticationToken()
  );

  public isTokenAlive$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private store: LocalStorageService,
    private injector: Injector
  ) {
  }

  // Login
  async userLogin(email: string, password: string) {
    const credentials = {email, password};
    const status = await this.http
      .post(CONST.USER_LOGIN, credentials)
      .toPromise();
    return status;
  }

  // Logina
  async userRegister(name: string, email: string, password: string) {
    const credentials = {name, email, password};
    const status = await this.http
      .post(CONST.USER_REGISTER, credentials)
      .toPromise();
    return status;
  }


  async logout() {
    return await this.userLogout().toPromise();
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // Logout
  userLogout() {
    this.loggedIn.next(false);
    this.clearLocalStorage();
    return this.http.post(CONST.USER_LOGOUT, null, {});
  }

  async login(email: string, password: string) {
    const status = await this.userLogin(email, password);
    this.loggedIn.next(true);
    this.setLocalStorage(status);
    return status;
  }

  async register(name: string, email: string, password: string) {
    const status = await this.userRegister(name, email, password);
    this.setLocalStorage(status);
    return status;
  }

  /*----------  Helper Methods  ----------*/

  // check access token exists or not
  hasAccessToken(): boolean {
    return !!this.store.retrieve('token');
  }

  // check access token exists or not
  getUserName(): string {
    return this.store.retrieve('user_name');
  }

  // check access token exists or not
  getEmail(): string {
    return this.store.retrieve('email');
  }

  // gets current user's authentication token
  getCurrentUserAuthenticationToken(): string {
    if (!!this.store.retrieve('token')) {
      return this.store.retrieve('token');
    }
    return '';
  }

  // Gets user type of current logged in user
  getCurrentUserTypeFromLocalStorage(): string {
    if (!!this.store.retrieve('userType')) {
      return this.store.retrieve('userType');
    }
    return '';
  }

  clearLocalStorage(): void {
    this.store.clear();
    this.userType$.next('');
    this.currentUserAuthenticationToken$.next('');
    this.isTokenAlive$.next(false);
    this.isUserExist$.next(false);
    this.loggedIn.next(false);
    this.userName$.next('');
    this.userEmail$.next('');
  }

  setLocalStorage(data: any): void {
    this.store.store('login', true);
    this.store.store('token', data.data.token);
    this.store.store('user_name', data.data.user.name);
    this.store.store('email', data.data.user.email);
    this.userName$.next(data.data.user.name);
    this.userEmail$.next(data.data.user.email);
    this.currentUserAuthenticationToken$.next(data.data.token);
    this.isTokenAlive$.next(true);
    this.currentUserAuthenticationToken$.next(data.data.token);
    this.isUserExist$.next(true);
    this.loggedIn.next(true);
  }
}
