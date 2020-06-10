import {Injectable} from '@angular/core';
import {Adapter} from './adapter';

export class AvailabilityModel {
  constructor(
   public baseAvailability: number,
   public basePrice: number,
   public id: number,
   public maxOccupancy: number,
   public name: string,
   public shortName: string,
   public totalPrice: number,
   public description: string
  )
  {}
}

@Injectable({
  providedIn: 'root',
})
export class HotelAdapter implements Adapter<AvailabilityModel> {
  adapt(item: any): AvailabilityModel {
    return new AvailabilityModel(
      item.base_availability,
      item.base_price,
      item.id,
      item.max_occupancy,
      item.name,
      item.short_name,
      item.total_price,
      item.description,
    );
  }
}
