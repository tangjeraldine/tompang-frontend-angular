import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { EmailService } from '../_services/email.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent {
  
  email_to_id="";
  email_to_username="kevintian";
  message="";
  error="";

  constructor(private emailService:EmailService, 
              private activatedRoute:ActivatedRoute,
              private router:Router,
              private _authService:AuthenticationService) {}

  ngOnInit() {
    if(this._authService.isCredentialsEmpty() || !this._authService.isCustomerRole()) {
      this.router.navigate(['login', {expired: '1'}]);
      return;
    }
    
  }

  send() {
    this.message = this.message.trim();

    if(this.message == "") {
      this.error = "";
    }

    
  }
}
