import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { StompService } from './stomp.service';

// Author: Kevin
// Purpose: Provides API calls for the discussion room functionalities to work

@Injectable({
  providedIn: 'root',
})
export class DiscussionRoomService {
  baseHref = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private _authService: AuthenticationService
  ) {}

  getRoomsAndMessages() {
    return this.http.get(
      this.baseHref +
        '/customer/discussion-room/list?' +
        this._authService.generateAuthParamsStr()
    );
  }

  getMessages(page: any, discussionRmId: string) {
    var params = new HttpParams()
      .append('page', page)
      .append('dr_id', discussionRmId);
    return this.http.get(
      this.baseHref +
        '/customer/discussion-message/list?' +
        this._authService.generateAuthParamsStr(),
      { params: params }
    );
  }

  sendMessage(msg: string, discussionRmId: string) {
    var params = { message: msg, dr_id: discussionRmId };
    var params_str = new URLSearchParams(params).toString();
    return this.http.get(
      this.baseHref +
        '/customer/discussion-message/add?' +
        this._authService.generateAuthParamsStr() +
        '&' +
        params_str
    );
  }

  sendFileMessage(file: File, discussionRmId: string) {
    var form_data = new FormData();
    var auth_params = this._authService.generateAuthHeaders();
    form_data.append('dr_id', discussionRmId);
    form_data.append('file', file, file.name);
    form_data.append('header_id', auth_params['header_id']);
    form_data.append('header_role', auth_params['header_role']);
    form_data.append('header_expiry', auth_params['header_expiry']);
    form_data.append('header_signature', auth_params['header_signature']);

    return this.http.post(
      this.baseHref + '/customer/discussion-message/add-file',
      form_data
    );
  }
}
