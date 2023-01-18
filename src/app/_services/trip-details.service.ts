import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class TripDetailsService {
  baseHref = 'http://localhost:8080';
  constructor(
    private http: HttpClient,
    private authServ: AuthenticationService
  ) {}

  addNewTrip(tripObj: any, id: any) {
    id = this.authServ.getId();
    return this.http.post(
      this.baseHref + '/customer/addTrip/' + `${id}`,
      tripObj
    );
  }
}
