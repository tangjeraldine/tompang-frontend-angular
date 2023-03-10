import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

// Author: Eugene
// Purpose: Get request to obtain other trips with similar postal code

@Injectable({
  providedIn: 'root',
})
export class SameDestinationUsersService {
  private baseURL = 'http://localhost:8080/customer';

  constructor(
    private authService: AuthenticationService,
    private httpClient: HttpClient
  ) {}

  listUsersWithSameTrips(
    fromPostal: string,
    toPostal: string,
    days: string,
    timeOfDay: string
  ) {
    var params = {
      fromPostal: fromPostal,
      toPostal: toPostal,
      days: days,
      timeOfDay: timeOfDay,
    };

    var paramsStr = new URLSearchParams(params).toString();
    var get =
      this.baseURL +
      '/trip/getTripSameDest?' +
      paramsStr +
      '&' +
      this.authService.generateAuthParamsStr();
    // alert(get)

    return this.httpClient.get(get);
  }
}
