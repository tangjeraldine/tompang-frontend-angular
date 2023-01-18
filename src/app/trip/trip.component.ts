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

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css'],
})
export class TripComponent implements OnInit {
  addNewTrip!: FormGroup;
  role!: number;
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
  joindays: any = this.days?.join();
  timeArray: string[] = ['Morning', 'Afternoon', 'Evening', 'Night'];
  timeOfTheDay: any;
  tripObj: any;
  toggled: boolean = false;

  changeRole1() {
    this.role = 2;
    // console.log(this.role);
  }

  changeRole2() {
    this.role = 1;
    // console.log(this.role);
  }

  constructor(
    private addNewTripFB: FormBuilder,
    private _authService: AuthenticationService,
    private addTripServ: AddTripService,
    private router: Router
  ) {}

  monday(i: number) {
    this.toggled = this.days.includes(i + 1);
    // console.log(this.toggled);
    if (this.toggled === false) {
      this.days?.push(i + 1);
      this.days.sort();
      // console.log(this.days);
    } else {
      this.days = this.days?.filter((x: number) => x !== i + 1);
      this.days.sort();
      // console.log(this.days);
    }
  }

  time(i: number) {
    if (!this.timeOfTheDay) {
      this.timeOfTheDay = i + 1;
    } else {
      this.timeOfTheDay = null;
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
      days: this.days.join(),
      timeOfDay: this.timeOfTheDay,
    });
    console.log(this.addNewTrip.value);
    this.addTripServ.addTrip(this.addNewTrip.value).subscribe((data) => {
      console.log('Trip added!');
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
