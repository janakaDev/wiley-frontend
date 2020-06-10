import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit, AfterViewChecked {
  isLoggedIn = this.authService.isUserExist$;
  email = this.authService.userEmail$;
  userName = this.authService.userName$;
  constructor(
    private cdRef: ChangeDetectorRef,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }

}
