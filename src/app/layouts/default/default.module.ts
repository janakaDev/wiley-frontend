import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from './default.component';
import {DashboardComponent} from '../../modules/dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {FlexModule} from '@angular/flex-layout';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {FilterPipe} from '../../core/pipes/filter.pipe';
import {BookingPageComponent} from '../../modules/booking-page/booking-page.component';
import {LoginPageComponent} from '../../modules/login-page/login-page.component';
import {RegisterComponent} from '../../modules/register/register.component';
import {MyBookingsComponent} from '../../modules/my-bookings/my-bookings.component';
import {OptionsComponent} from '../../modules/options/options.component';


const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'book/:id',
        component: BookingPageComponent
      },
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'my-bookings',
        component: MyBookingsComponent
      }
    ]
  }
];


@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterComponent,
    DefaultComponent,
    DashboardComponent,
    FilterPipe,
    BookingPageComponent,
    MyBookingsComponent,
    OptionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    FlexModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule
  ],
})
export class DefaultModule { }
