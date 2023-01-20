import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

// Author: Kevin
// Purpose: Provides API calls for the user's personal trip list - show list, update and delete trip details

@Injectable({
  providedIn: 'root',
})
export class TripService {
  baseHref = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private _authService: AuthenticationService
  ) {}

  getTrips() {
    return this.http.get(
      this.baseHref +
        '/customer/trip/list?' +
        this._authService.generateAuthParamsStr()
    );
  }

  updateTrip(
    id: string,
    from_postal: string,
    to_postal: string,
    description: string,
    role: string,
    days: string,
    time_of_day: string
  ) {
    var form_data = new FormData();
    var auth_params = this._authService.generateAuthHeaders();
    form_data.append('id', id);
    form_data.append('fromPostal', from_postal);
    form_data.append('toPostal', to_postal);
    form_data.append('description', description);
    form_data.append('role', role);
    form_data.append('days', days);
    form_data.append('timeOfDay', time_of_day);
    form_data.append('header_id', auth_params['header_id']);
    form_data.append('header_role', auth_params['header_role']);
    form_data.append('header_expiry', auth_params['header_expiry']);
    form_data.append('header_signature', auth_params['header_signature']);

    return this.http.post(this.baseHref + '/customer/trip/update', form_data);
  }

  deleteTrip(id: string) {
    var form_data = new FormData();
    var auth_params = this._authService.generateAuthHeaders();
    form_data.append('id', id);
    form_data.append('header_id', auth_params['header_id']);
    form_data.append('header_role', auth_params['header_role']);
    form_data.append('header_expiry', auth_params['header_expiry']);
    form_data.append('header_signature', auth_params['header_signature']);

    return this.http.post(this.baseHref + '/customer/trip/delete', form_data);
  }
}
