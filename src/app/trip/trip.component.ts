import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css'],
})
export class TripComponent {
  constructor(
    private _authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    if (
      this._authService.isCredentialsEmpty() ||
      !this._authService.isCustomerRole()
    ) {
      this.router.navigate(['/login', { expired: '1' }]);
      return;
    }
  }
}
