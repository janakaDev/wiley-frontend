import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import {HotelCardComponent} from './hotel-card/hotel-card.component';

const routes: Routes = [
];

@NgModule({
  declarations: [
    HotelCardComponent,
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class WelcomeModule {}
