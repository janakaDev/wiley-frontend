import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {HOTEL} from '../../../../common/Constants';
import {Hotel} from '../../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getHotelList(): Observable<Hotel[]> {
    return this.http
      .get(HOTEL.GET_LIST, {})
      .pipe(
        map((data: any) =>
          data.data.data.data.map(
            (item: any) =>
              new Hotel(
                item.id,
                item.image_url,
                item.name,
                item.location,
                item.stars,
                item.description,
                item.spa,
                item.pool,
                item.taxi,
              )
          )
        )
      );
  }
}
