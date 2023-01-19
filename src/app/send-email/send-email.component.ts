import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../_services/email.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent {
  
  email_to_id="";
  email_to_username="";
  message="";
  error="";

  constructor(private emailService:EmailService, 
              private activatedRoute:ActivatedRoute) {}

  ngOnInit() {
    
  }

  send() {
    this.message = this.message.trim();

    if(this.message == "") {
      this.error = "";
    }

    
  }
}
