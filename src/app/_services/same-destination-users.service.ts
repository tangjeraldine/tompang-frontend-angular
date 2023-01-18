import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SameDestinationUsersService {

  private baseURL="http://localhost:8080/customer"

  

  constructor(private authService: AuthenticationService, private httpClient:HttpClient) { }

  listUsersWithSameTrips(fromPostal:string, toPostal:string,days:string,timeOfDay:string) {

    

    return this.httpClient.get(`${this.baseURL}/trip/getTripSameDest/${fromPostal}/${toPostal}/${days}/${timeOfDay}`+'?'+this.authService.generateAuthParamsStr());

  }

}
