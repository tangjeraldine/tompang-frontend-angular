import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseURL="http://localhost:8080/"

  customers:any;

  

  constructor(private httpClient:HttpClient) { }

  getCustomerById(id:any) {
    return this.httpClient.get(`${this.baseURL}/getCustomer/${id}`);
  }
}
