import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from '../../core/services/toaster/toaster.service';
import {MatDialog} from '@angular/material/dialog';
import {HotelService} from '../../core/services/hotel/hotel.service';
import {DialogComponent} from '../../shared/components/dialog/dialog.component';
import {FormDialogComponent} from '../../shared/components/form-dialog/form-dialog.component';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  displayedColumns: string[] = ['hotel', 'check-in', 'check-out', 'price', 'guests', 'status',  'actions'];
  dataSource: any[];
  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private toaster: ToasterService,
    private router: Router,
    public auth: AuthService,
    public hotelService: HotelService
  ) { }

  ngOnInit(): void {
    this.hotelService.getBookingsListByUser().subscribe(response => {
      console.log(response);
      this.dataSource = response;
    });
  }

  checkIn(id, checkin, checkout, status, hotelId) {
    const checkinFormatted = new Date(checkin);
    const today = new Date();
    const request = {
      bookingId: id,
      hotel: hotelId,
    };
    if (checkinFormatted <= today && status === 'boorked') {
      this.toaster.errorToast('the checkin date has passed');
    } else {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '368px',
        maxWidth: '40vw',
        data: {message: 'Are You sure ?', button: 'Yes'}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.hotelService.checkIn(request).subscribe(response => {
            console.log(response);
          });
        }
      });
    }
  }

  checkOut(id, checkin, checkout, status, hotelId, reservationNights) {
    const checkoutFormatted = new Date(checkout);
    const today = new Date();
    const request = {
      bookingId: id,
      hotel: hotelId,
      nights: reservationNights
    };
    if (checkoutFormatted < today && status === 'booked') {
      this.toaster.errorToast('the checkout date has passed');
    } else {
      const dialogRef = this.dialog.open(FormDialogComponent, {
        width: '368px',
        maxWidth: '40vw',
        data: {message: 'Are You sure ?', button: 'Yes'}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result !== false) {
          this.hotelService.checkOut(request).subscribe(response => {
            if ((response as any).success) {
              this.toaster.successToast((response as any).message);
            } else {
              this.toaster.errorToast((response as any).message);
            }
          });
        }
      });
    }
  }

  orderSpa(id: any) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '368px',
      maxWidth: '40vw',
      data: {message: 'Are You sure ?', button: 'Yes'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== false) {
        this.hotelService.orderSpa(id).subscribe(response => {
          if ((response as any).success) {
            this.toaster.successToast((response as any).message);
          } else {
            this.toaster.errorToast((response as any).message);
          }
        });
      }
    });
  }

  deleteBooking(id: any) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '368px',
      maxWidth: '40vw',
      data: {message: 'Are You sure ?', button: 'Yes'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== false) {
        this.hotelService.deleteBooking(id).subscribe(response => {
          if ((response as any).success) {
            this.toaster.successToast((response as any).message);
          } else {
            this.toaster.errorToast((response as any).message);
          }
        });
      }
    });
  }

  orderFood(id: any) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '368px',
      maxWidth: '40vw',
      data: {message: 'Are You sure ?', button: 'Yes'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== false) {
        this.hotelService.orderFood(id).subscribe(response => {
          if ((response as any).success) {
            this.toaster.successToast((response as any).message);
          } else {
            this.toaster.errorToast((response as any).message);
          }
        });
      }
    });
  }

  orderPool(id: any) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '368px',
      maxWidth: '40vw',
      data: {message: 'Are You sure ?', button: 'Yes'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== false) {
        this.hotelService.orderPool(id).subscribe(response => {
          if ((response as any).success) {
            this.toaster.successToast((response as any).message);
          } else {
            this.toaster.errorToast((response as any).message);
          }
        });
      }
    });
  }

  orderTaxi(id: any) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '368px',
      maxWidth: '40vw',
      data: {message: 'Are You sure ?', button: 'Yes'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== false) {
        this.hotelService.orderTaxi(id).subscribe(response => {
          if ((response as any).success) {
            this.toaster.successToast((response as any).message);
          } else {
            this.toaster.errorToast((response as any).message);
          }
        });
      }
    });
  }
}
