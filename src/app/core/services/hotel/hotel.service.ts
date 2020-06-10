import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HOTEL} from '../../../../common/Constants';
import {AvailabilityModel, HotelAdapter} from '../../models/availability.model';
import {BookingAdapter, BookingHotelModel, BookingModel} from '../../models/booking.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(
    private http: HttpClient,
    private hotelAdapter: HotelAdapter,
    private bookingHotelAdapter: BookingAdapter,
  ) { }

  checkAvailability(data): Observable<AvailabilityModel[]> {
    return this.http.post(HOTEL.CHECK_AVAILABILITY, {data})
      .pipe(
        map((response: any) => response.data.map((item) => this.hotelAdapter.adapt(item)))
      );
  }

  createBooking(data) {
    return this.http.post(HOTEL.CREATE_BOOKING, {data});
  }

  getBookingsListByUser() {
    return this.http.get(HOTEL.GET_BOOKING_LIST, {})
      .pipe(
        map((response: any) =>
          response.data.map((item) => this.bookingHotelAdapter.adapt(item)))
      );
  }

  checkIn(data) {
    return this.http.post(HOTEL.CHECK_IN, {data});
  }

  checkOut(data) {
    return this.http.post(HOTEL.CHECK_OUT, {data});
  }

  orderSpa(data) {
    return this.http.post(HOTEL.BOOK_SPA, {data});
  }

  deleteBooking(data) {
    return this.http.post(HOTEL.DELETE, {data});
  }

  orderFood(data) {
    return this.http.post(HOTEL.BOOK_FOOD, {data});
  }

  orderPool(data) {
    return this.http.post(HOTEL.BOOK_POOL, {data});
  }

  orderTaxi(data) {
    return this.http.post(HOTEL.BOOK_TAXI, {data});
  }
}
