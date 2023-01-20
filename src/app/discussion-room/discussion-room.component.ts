import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { DiscussionRoomService } from '../_services/discussion-room.service';
import { StompService } from '../_services/stomp.service';

// Author: Kevin
// Purpose: Provides functionality to discussion room component

@Component({
  selector: 'app-discussion-room',
  templateUrl: './discussion-room.component.html',
  styleUrls: ['./discussion-room.component.css'],
})
export class DiscussionRoomComponent {
  constructor(
    private _authService: AuthenticationService,
    private _discussionRoomService: DiscussionRoomService,
    private router: Router,
    private _stompService: StompService
  ) {}

  username = '';

  discussion_room_list: any;
  message_list: any;
  current_page = 1;
  total_message_pages: Array<any> = [];
  selected_dr_id: any;
  new_message = '';

  is_dragging_file = false;

  incoming_msg_subscription_ref: any = undefined;
  users_online_subscription_ref: any = undefined;
  typing_subscription_ref: any = undefined;
  stop_typing_subscription_ref: any = undefined;

  users_online = [];

  users_typing: Array<string> = [];

  dragOver(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.current_page == this.total_message_pages.length) {
      this.is_dragging_file = true;
    }
  }

  dragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.is_dragging_file = false;
  }

  drop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.is_dragging_file = false;

    if (this.current_page != this.total_message_pages.length) {
      return;
    }

    var files = event.dataTransfer.files;
    var file: File = files[0];
    if (files.length > 1) {
      alert('Cannot upload more than 1 file at a time!');
      return;
    }

    if (file.type == '') {
      alert('Cannot upload of directory allowed!');
      return;
    }

    this._discussionRoomService
      .sendFileMessage(file, this.selected_dr_id)
      .subscribe(
        (data: any) => {
          if (data.header_rsp == 'ok') {
            if (this.message_list.length >= 10) {
              this.changePage(this.current_page + 1);
            } else {
              this.message_list.push(data.added_message);
            }
          }
        },
        (error) => {
          this.router.navigate(['/login', { expired: '1' }]);
          return;
        }
      );
  }

  changeRoom() {
    if (this.incoming_msg_subscription_ref != undefined) {
      this.incoming_msg_subscription_ref.unsubscribe();
      this.incoming_msg_subscription_ref = undefined;
    }

    if (this.users_online_subscription_ref != undefined) {
      this.users_online_subscription_ref.unsubscribe();
      this.users_online_subscription_ref = undefined;
    }

    if (this.typing_subscription_ref != undefined) {
      this.typing_subscription_ref.unsubscribe();
      this.typing_subscription_ref = undefined;
    }

    if (this.stop_typing_subscription_ref != undefined) {
      this.stop_typing_subscription_ref.unsubscribe();
      this.stop_typing_subscription_ref = undefined;
    }

    //Subscribe to listen for users online
    this.users_online_subscription_ref = this._stompService.subscribe(
      '/client/users-online/' + this.selected_dr_id,
      (data: any) => {
        this.updateUsersOnline(data);
      }
    );

    //Subscribe to refresh page when new message comes it
    this.incoming_msg_subscription_ref = this._stompService.subscribe(
      '/client/new-message-status/' + this.selected_dr_id,
      (data: any) => {
        if (this.message_list.length >= 10 && 
            this.current_page == this.total_message_pages.length) {
          this.changePage(this.current_page + 1);
        } else {
          this.changePage(this.current_page);
        }
      }
    );

    //Subscribe to typing status
    this.typing_subscription_ref = this._stompService.subscribe(
      '/client/typing/' + this.selected_dr_id,
      (data: any) => {
        var json = JSON.parse(data.body);

        if (json.username == this.username) {
          return;
        }

        if (!this.users_typing.includes(json.username)) {
          this.users_typing.push(json.username);
        }
      }
    );

    //Subscribe to stop typing status
    this.stop_typing_subscription_ref = this._stompService.subscribe(
      '/client/stop-typing/' + this.selected_dr_id,
      (data: any) => {
        var json = JSON.parse(data.body);

        if (this.users_typing.includes(json.username)) {
          var index = this.users_typing.findIndex((a) => a == json.username);
          if (index != -1) {
            this.users_typing.splice(index, 1);
          }
        }
      }
    );

    //Send a notification that you are check in
    this._stompService.send('/server/check-in', { dr_id: this.selected_dr_id });

    this.changePage(1);
  }

  ngOnDestroy() {
    if (this.incoming_msg_subscription_ref != undefined) {
      this.incoming_msg_subscription_ref.unsubscribe();
      this.incoming_msg_subscription_ref = undefined;
    }

    if (this.users_online_subscription_ref != undefined) {
      this.users_online_subscription_ref.unsubscribe();
      this.users_online_subscription_ref = undefined;
    }

    if (this.typing_subscription_ref != undefined) {
      this.typing_subscription_ref.unsubscribe();
      this.typing_subscription_ref = undefined;
    }

    if (this.stop_typing_subscription_ref != undefined) {
      this.stop_typing_subscription_ref.unsubscribe();
      this.stop_typing_subscription_ref = undefined;
    }

    this._stompService.cleanUp();
  }

  ngOnInit() {
    if (
      this._authService.isCredentialsEmpty() ||
      !this._authService.isCustomerRole()
    ) {
      this.router.navigate(['/login', { expired: '1' }]);
      return;
    }

    this._discussionRoomService.getRoomsAndMessages().subscribe(
      (data: any) => {
        this.username = data.customer.username;
        this.discussion_room_list = data.discussion_room_list;
        this.message_list = data.message_list;

        for (let i = 1; i <= data.total_message_pages; i++) {
          this.total_message_pages.push(i);
        }

        if (this.discussion_room_list.length != 0) {
          this.selected_dr_id = this.discussion_room_list[0].id;

          //Connect to websocket
          this._stompService.init();
          this._stompService.connect((frame: any) => {
            //Subscribe to listen for users online
            this.users_online_subscription_ref = this._stompService.subscribe(
              '/client/users-online/' + this.selected_dr_id,
              (data: any) => {
                this.updateUsersOnline(data);
              }
            );

            //Subscribe to refresh page when new message comes it
            this.incoming_msg_subscription_ref = this._stompService.subscribe(
              '/client/new-message-status/' + this.selected_dr_id,
              (data: any) => {
                if (this.message_list.length >= 10 && 
                    this.current_page == this.total_message_pages.length) {
                  this.changePage(this.current_page + 1);
                } else {
                  this.changePage(this.current_page);
                }
              }
            );

            //Subscribe to typing status
            this.typing_subscription_ref = this._stompService.subscribe(
              '/client/typing/' + this.selected_dr_id,
              (data: any) => {
                var json = JSON.parse(data.body);

                if (json.username == this.username) {
                  return;
                }

                if (!this.users_typing.includes(json.username)) {
                  this.users_typing.push(json.username);
                }
              }
            );

            //Subscribe to cease typing status
            this.stop_typing_subscription_ref = this._stompService.subscribe(
              '/client/stop-typing/' + this.selected_dr_id,
              (data: any) => {
                var json = JSON.parse(data.body);

                if (this.users_typing.includes(json.username)) {
                  var index = this.users_typing.findIndex(
                    (a) => a == json.username
                  );
                  if (index != -1) {
                    this.users_typing.splice(index, 1);
                  }
                }
              }
            );

            //Send a notification that you are online
            this._stompService.send('/server/check-in', {
              dr_id: this.selected_dr_id,
            });
          });
        }
      },
      (error) => {
        this.router.navigate(['login', { expired: '1' }]);
        return;
      }
    );
  }

  updateUsersOnline(data: any) {
    this.users_online = JSON.parse(data.body);
  }

  broadcastTypingStatus() {
    if (this.new_message.trim() == '') {
      this._stompService.send('/server/stop-typing', {
        username: this.username,
        dr_id: this.selected_dr_id,
      });
    } else {
      this._stompService.send('/server/typing', {
        username: this.username,
        dr_id: this.selected_dr_id,
      });
    }
  }

  sendMessage() {
    this.new_message = this.new_message.trim();

    if (this.new_message == '') {
      return;
    }

    this._discussionRoomService
      .sendMessage(this.new_message, this.selected_dr_id)
      .subscribe(
        (data: any) => {
          if (data.header_rsp == 'ok') {
            this.new_message = '';
            this.broadcastTypingStatus();
          }
        },
        (error) => {
          this.router.navigate(['/login', { expired: '1' }]);
          return;
        }
      );
  }

  changePage(pageNo: any) {
    this._discussionRoomService
      .getMessages(pageNo, this.selected_dr_id)
      .subscribe(
        (data: any) => {
          this.message_list = data.message_list; 
          this.current_page = pageNo; 

          this.total_message_pages = [];
          for (let i = 1; i <= data.total_message_pages; i++) {
            this.total_message_pages.push(i);
          }
        },
        (error) => {
          this.router.navigate(['/login', { expired: '1' }]);
          return;
        }
      );
  }
}
