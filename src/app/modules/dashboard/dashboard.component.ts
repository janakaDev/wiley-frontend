import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from '../../core/services/dashboard/dashboard.service';
import {Hotel} from '../../core/models/hotel.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  hotelData: Hotel[];
  searchText: string;
  angForm: FormGroup;

  constructor(
    private dashboardApi: DashboardService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.angForm = this.fb.group({
      searchText: ['', Validators.required]
    });
    this.dashboardApi
      .getHotelList()
      .subscribe((data: any) => {
        this.hotelData = data;
      });
  }

  submitClick(event) {
    this.searchText = this.angForm.get('searchText').value;
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }
}
