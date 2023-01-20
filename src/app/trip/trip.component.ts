import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AddTripService } from '../_services/add-trip.service';
import { AuthenticationService } from '../_services/authentication.service';
import { ViewportScroller } from '@angular/common';
import { CustomerService } from '../_services/customer.service';

// Author: Jeraldine

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css'],
})
export class TripComponent implements OnInit {
  addNewTrip!: FormGroup;
  role!: number;
  array: boolean[] = [false, false, false, false, false, false, false];
  array2: boolean[] = [false, false, false, false, false];
  dayArray: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  days: number[] = [];
  timeArray: string[] = ['Morning', 'Afternoon', 'Evening', 'Night'];
  timeOfTheDay: any;
  tripObj: any;
  toggled: boolean = false;
  addSuccess: boolean = false;
  timerCount: number = 5;
  toCustomer: any;
  custID: any;

  changeRole1() {
    this.role = 2;
    this.scroller.scrollToAnchor('formTarget');
  }

  changeRole2() {
    this.role = 1;
    this.scroller.scrollToAnchor('formTarget');
  }

  constructor(
    private addNewTripFB: FormBuilder,
    private _authService: AuthenticationService,
    private customerService: CustomerService,
    private addTripServ: AddTripService,
    private router: Router,
    private scroller: ViewportScroller
  ) {}

  monday(i: number) {
    this.toggled = this.days.includes(i + 1);
    if (this.toggled === false) {
      this.days?.push(i + 1);
      this.days.sort();
      this.array[i] = true;
    } else {
      this.days = this.days?.filter((x: number) => x !== i + 1);
      this.days.sort();
      this.array[i] = false;
    }
  }

  time(i: number) {
    if (!this.timeOfTheDay) {
      this.timeOfTheDay = i + 1;
      this.array2[i] = true;
    } else {
      this.timeOfTheDay = !this.timeOfTheDay;
      for (let j = 0; j < this.array2.length; j++) {
        this.array2[j] = false;
      }
    }
  }

  resetFields() {
    this.addNewTrip.reset();
    this.days = [];
    this.timeOfTheDay = null;
  }

  addNewTripDetails() {
    this.addNewTrip.patchValue({
      role: this.role,
      days: this.days?.join(''),
      timeOfDay: this.timeOfTheDay,
    });
    this.addTripServ.addTrip(this.addNewTrip.value).subscribe((data) => {
      this.addSuccess = true;
      setInterval(() => (this.timerCount -= 1), 1000);
      setTimeout(() => {
        this.router.navigate(['/trips']);
      }, 5000);
    });
  }

  isSamePostalCode: boolean = false;
  samePostalCode = () => {
    this.addNewTrip.value.fromPostCode === this.addNewTrip.value.toPostCode
      ? (this.isSamePostalCode = true)
      : (this.isSamePostalCode = false);
  };

  ngOnInit() {
    // Authentication request sent to server on initiation of this page
    if (
      this._authService.isCredentialsEmpty() ||
      !this._authService.isCustomerRole()
    ) {
      this.router.navigate(['/login', { expired: '1' }]);
      return;
    }

    this.custID = this._authService.getId();
    this.customerService.getCustomerById(this.custID).subscribe((data) => {
      this.toCustomer = data;
    });

    // Binding input from reactive form "addNewTrip"
    this.addNewTrip = this.addNewTripFB.group({
      fromPostCode: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{6}'),
      ]),
      toPostCode: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{6}'),
      ]),
      role: new FormControl('', [Validators.required]),
      days: new FormControl('', [Validators.required]),
      timeOfDay: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }
}
