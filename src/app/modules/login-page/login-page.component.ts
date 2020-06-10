import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../core/services/auth/auth.service';
import ERROR_MESSAGES from '../../../common/Constants';
import {ToasterService} from '../../core/services/toaster/toaster.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  angForm: FormGroup;
  nameError: any;
  passwordError: any;
  email = '';
  password = '';
  isLoading = false;
  showInputFeild = true;
  loginFailed = false;
  @ViewChild('loginFormDirective') private loginFormDirective: NgForm;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private auth: AuthService,
    private router: Router,
    private toaster: ToasterService
  ) {
    if (this.auth.currentUserAuthenticationToken$.getValue() !== '') {
      this.router.navigateByUrl('/dashboard');
    }
    this.createForm();
    this.nameError = ERROR_MESSAGES.LOGIN_USERNAME_EMPTY;
    this.passwordError = ERROR_MESSAGES.LOGIN_PASSWORD_EMPTY;
  }

  /**
   * creates the login form controls
   */
  createForm() {
    this.angForm = this.fb.group({
      email: [this.email, Validators.required],
      password: [this.password, Validators.required]
    });
  }

  /**
   * Submits the user credentials to the login API to succcessfully
   * login and retrieve the auth token
   */
  async submitClick() {
    this.isLoading = true;
    this.showInputFeild = false;

    try {
      const res = await this.auth.login(
        this.angForm.get('email').value,
        this.angForm.get('password').value
      );
      if ((res as any).success) {
        this.loginFailed = false;
        if (this.auth.previousUrl$.value !== '' && this.auth.returnToPrevious$.value) {
          this.router.navigateByUrl(this.auth.previousUrl$.value.toString());
          return;
        }
        this.router.navigateByUrl('dashboard');
        this.toaster.successToast('Login Successfully');
      } else {
        this.toaster.errorToast('Login Failed. Please check your credentials');
      }
    } catch (error) {
      this.toaster.errorToast(error);
    }
  }
}
