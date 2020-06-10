import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MaterialModule} from './material';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule} from '@angular/router';
import { DialogComponent } from './components/dialog/dialog.component';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';


@NgModule({
  imports: [FlexLayoutModule, CommonModule, FormsModule, ReactiveFormsModule, MaterialModule,
    MatCardModule, MatToolbarModule, FormsModule, MatSelectModule, MatIconModule, MatSidenavModule, RouterModule],
  declarations: [ HeaderComponent, FooterComponent, SidebarComponent, DialogComponent, FormDialogComponent],
  providers: [FormsModule],
  exports: [FlexLayoutModule, CommonModule, FormsModule, ReactiveFormsModule, MaterialModule,
    MatCardModule, MatToolbarModule, FormsModule, MatSelectModule, MatIconModule,  HeaderComponent, FooterComponent, SidebarComponent]
})
export class SharedModule {
  private static MaterialModule: any;
}
