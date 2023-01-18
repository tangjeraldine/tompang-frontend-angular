import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css'],
})
export class TripComponent implements OnInit {
  addNewTrip!: FormGroup;
  role!: number;

  changeRole1() {
    this.role = 2;
  }

  changeRole2() {
    this.role = 1;
  }

  constructor(
    private addNewTripFB: FormBuilder,
    private _authService: AuthenticationService,
    private router: Router
  ) {}

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
      roleType: new FormControl(this.role),
      fromPostCode: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
      toPostCode: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
    });
  }
}
