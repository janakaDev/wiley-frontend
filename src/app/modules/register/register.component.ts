import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../core/services/auth/auth.service';
import ERROR_MESSAGES from '../../../common/Constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  angForm: FormGroup;
  nameError: any;
  passwordError: any;
  isLoading = false;
  showInputField = true;
  requestError: any = '';
  loginFailed = false;
  @ViewChild('loginFormDirective') private loginFormDirective: NgForm;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private auth: AuthService,
    private router: Router
  ) {
    this.createForm();
    this.nameError = ERROR_MESSAGES.LOGIN_USERNAME_EMPTY;
    this.passwordError = ERROR_MESSAGES.LOGIN_PASSWORD_EMPTY;
  }

  /**
   * creates the login form controls
   */
  createForm() {
    this.angForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  /**
   * Submits the user credentials to the login API to successfully
   * login and retrieve the auth token
   */
  async submitClick() {
    this.isLoading = true;
    this.showInputField = false;

    try {
      const res = await this.auth.register(
        this.angForm.get('name').value,
        this.angForm.get('email').value,
        this.angForm.get('password').value
      );
      if ((res as any).success) {
        this.loginFailed = false;
        if (this.auth.previousUrl$.value !== '' && this.auth.returnToPrevious$.value) {
          this.router.navigateByUrl(this.auth.previousUrl$.value.toString());
          return;
        }
        this.router.navigateByUrl('/dashboard');
      }
    } catch (error) {
      this.loginFailed = true;
      this.isLoading = false;
      this.showInputField = true;
      if (error.status === 401) {
        this.requestError =
          'This can occur for invalid email and password or a wrong password for a given email.';
      } else if (error.status === 500) {
        this.requestError = 'A server side error has been occurred.';
      }
    }
  }
}
