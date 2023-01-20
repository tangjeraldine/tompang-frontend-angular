import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './authentication.service';

// Author: Eugene
// Purpose: Sends email to another user.

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  baseHref = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private _authService: AuthenticationService
  ) {}

  sendEmail(toCustomerId: any, message: any) {
    var form_data = new FormData();
    var auth_params = this._authService.generateAuthHeaders();
    form_data.append('to_id', toCustomerId);
    form_data.append('message', message);
    form_data.append('header_id', auth_params['header_id']);
    form_data.append('header_role', auth_params['header_role']);
    form_data.append('header_expiry', auth_params['header_expiry']);
    form_data.append('header_signature', auth_params['header_signature']);

    return this.http.post(this.baseHref + '/customer/send-email', form_data);
  }
}
