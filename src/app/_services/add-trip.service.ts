import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

// Author: Jeraldine
// Purpose: To take in data from TripComponent and convert into FormData -> Append authorisation information so that the post request can be authorised.
@Injectable({
  providedIn: 'root',
})
export class AddTripService {
  private baseURL = 'http://localhost:8080';

  constructor(
    private authService: AuthenticationService,
    private httpClient: HttpClient
  ) {}

  addTrip(trip: any) {
    var auth_params = this.authService.generateAuthHeaders();
    let formData = new FormData();
    formData.append('fromPostal', trip.fromPostCode);
    formData.append('toPostal', trip.toPostCode);
    formData.append('role', trip.role);
    formData.append('days', trip.days);
    formData.append('timeOfDay', trip.timeOfDay);
    formData.append('description', trip.description);
    formData.append('header_id', auth_params['header_id']);
    formData.append('header_role', auth_params['header_role']);
    formData.append('header_expiry', auth_params['header_expiry']);
    formData.append('header_signature', auth_params['header_signature']);

    return this.httpClient.post(this.baseURL + '/customer/trip/add', formData);
  }
}
