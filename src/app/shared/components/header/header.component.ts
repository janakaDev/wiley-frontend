import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AuthService} from '../../../core/services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from '../../../core/services/toaster/toaster.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  isLoggedIn = this.auth.isUserExist$;
  constructor(
    private auth: AuthService,
    private route: Router,
    private toaster: ToasterService,
  ) { }

  ngOnInit() { }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  logout2() {
    try {
      setTimeout(async () => {
        const res = await this.auth.logout();
        if ((res as any).success) {
          this.route.navigateByUrl('/dashboard');
        }
      }, 500);
    } catch (error) {
      this.toaster.errorToast(error.error.message);
    }
  }
}
