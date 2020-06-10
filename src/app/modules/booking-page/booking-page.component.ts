import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HotelService} from '../../core/services/hotel/hotel.service';
import {AvailabilityModel} from '../../core/models/availability.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../core/services/auth/auth.service';
import {ToasterService} from '../../core/services/toaster/toaster.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../shared/components/dialog/dialog.component';
import {BookingModel} from '../../core/models/booking.model';
import * as ValidationHelper from '../../core/helpers/ValidationHelper';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit {
  bookingForm: FormGroup;
  minStartDate = new Date();
  validationMessages = {
    name: [
      {
        type: 'required',
        message: 'Challenge name is required'
      }
    ],
    startDate: [
      {
        type: 'required',
        message: 'Start date is required'
      },

    ],
    endDate: [
      {
        type: 'required',
        message: 'End date is required'
      },
      {
        type: 'isBefore',
        message: 'End date should be greater than the start date'
      },
    ],
  };
  handler: any = null;
  isAvailable: boolean;
  bookNow: boolean;
  roomAvailabilities: AvailabilityModel[];
  startDate1: any;
  endDate2: any;
  hotelId: any;
  isLoggedIn = this.authService.isUserExist$;
  private occupancy: number;
  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private toasterService: ToasterService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.isAvailable = false;
  }

  ngOnInit(): void {
    this.authService.previousUrl$.next('');
    this.authService.returnToPrevious$.next(false);
    this.bookNow = false;

    this.activatedRoute.params.subscribe(params => {
      this.hotelId = params.id;
    });
    this.loadStripe();
    this.bookingForm = this.fb.group({
      start_date: new FormControl(null, Validators.compose([Validators.required])),
      min_occupancy: new FormControl(null, Validators.compose([Validators.required])),
      end_date: new FormControl(null, Validators.compose([Validators.required])),
    }, {
      validators: [
        ValidationHelper.secondDateGreaterThanFirstDate('start_date', 'end_date'),
      ]
    }
    );
  }

  submitForCheck() {
    try {
      const data = this.bookingForm.value;
      data.hotelId = this.hotelId;
      this.hotelService.checkAvailability(data).subscribe(value => {
        console.log(data.start_date.toLocaleString());
        this.startDate1 = data.start_date.toDateString();
        this.endDate2 = data.end_date.toDateString();
        this.occupancy = data.min_occupancy;
        this.roomAvailabilities = value;
        this.isAvailable = true;
      });
    } catch (error) {
      console.log(error);
    }
  }

  hasError(controlName, validationType) {
    const control = this.bookingForm.get(controlName);
    return control.hasError(validationType) && (control.dirty || control.touched);
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const stripe = window.document.createElement('script');
      stripe.id = 'stripe-script';
      stripe.type = 'text/javascript';
      stripe.src = 'https://checkout.stripe.com/checkout.js';
      stripe.onload = () => {
        this.handler = (window as any).StripeCheckout.configure({
          key: 'pk_test_51GrryjJR4ryk1Re5PrwgQrVmzD2ZZSwUcObsAdDyd1wK7SPRz4QCpdBBSh1aEmSjaeo2HbG70lYEmDS5us30jzFI00qHy6wU87',
          locale: 'auto',
          token(token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token);
            alert('Payment Success!!');
          }
        });
      };
      window.document.body.appendChild(stripe);
    }
  }

   pay(payment, tokenCallback) {
     const handler = (window as any).StripeCheckout.configure({
       key: 'pk_test_51GrryjJR4ryk1Re5PrwgQrVmzD2ZZSwUcObsAdDyd1wK7SPRz4QCpdBBSh1aEmSjaeo2HbG70lYEmDS5us30jzFI00qHy6wU87',
       locale: 'auto',
       token: tokenCallback
     });

     handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: payment * 100
    });
  }

  async bookRoom(id, price) {
    if (!this.isLoggedIn.value) {
      this.toasterService.errorToast('You need to log In before you proceed');
      this.authService.previousUrl$.next(this.router.url);
      this.authService.returnToPrevious$.next(true);

      const dialogRef = this.dialog.open(DialogComponent, {
        width: '368px',
        maxWidth: '40vw',
        data: {message: 'You need to log In before you proceed', button: 'Log In'}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.router.navigateByUrl('/dashboard/login');
        }
      });
    } else {
      this.pay(price, (token: any) => {
        const booking = new BookingModel(
          this.startDate1,
          this.endDate2,
          price,
          id,
          this.hotelId,
          true,
          token,
          this.occupancy
        );

        this.hotelService.createBooking(booking).subscribe(response => {
          if ((response as any).success) {
            this.toasterService.successToast((response as any).message);
          } else {
            this.toasterService.errorToast('Booking creation failed. Please try later');
          }
        });
      });
    }
  }
}
