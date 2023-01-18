import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AddTripService {
  private baseURL = 'http://localhost:8080/customer';

  constructor(
    private authService: AuthenticationService,
    private httpClient: HttpClient
  ) {}

  addTrip(trip: any) {
    var auth_params = this.authService.generateAuthHeaders();
    const customerId = auth_params['header_id'];

    return this.httpClient.post(`${this.baseURL}/addTrip/${customerId}`, trip);
  }
}
