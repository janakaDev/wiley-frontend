import {Injectable} from '@angular/core';
import {Adapter} from './adapter';
import {Hotel} from './hotel.model';

export class BookingModel {
  constructor(
    public startDate: string,
    public endDate: string,
    public totalPrice: number,
    public roomId: number,
    public hotelId: string,
    public isPaid: boolean,
    public paymentToken: any,
    public occupancy: number,
  )
  {}
}


export class BookingHotelModel {
  constructor(
    public booking: BookingModel,
    public hotel: Hotel,
    public reservationNights: any[],
  )
  {}
}

@Injectable({
  providedIn: 'root',
})
export class BookingAdapter implements Adapter<BookingHotelModel> {
  adapt(item: any): BookingHotelModel {
    return new BookingHotelModel(
      item.booking,
      item.hotel,
      item.reservation_nights,
    );
  }
}
