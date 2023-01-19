import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { CustomerService } from '../_services/customer.service';
import { EmailService } from '../_services/email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit{

  toCustomerId!:number;
  toCustomer:any
  userId!:number;
  user:any
  addNewEmail!: FormGroup;
  message:any
  sent = false;

  constructor(private authService:AuthenticationService, 
              private emailService: EmailService, 
              private route:ActivatedRoute, 
              private router:Router, 
              private addNewEmailFB: FormBuilder) {}

  ngOnInit(): void {
    if(this.authService.isCredentialsEmpty() || !this.authService.isCustomerRole()) {
      this.router.navigate(['/login', {expired: '1'}]);
      return;
    } 

    this.toCustomerId=this.route.snapshot.params['id'];
    this.userId=this.authService.generateAuthHeaders()['header_id']; 

    this.addNewEmail = this.addNewEmailFB.group({
      message: new FormControl('',Validators.required),
    });
  }

  sendEmail() { 
    this.sent = true;

    this.emailService.sendEmail(this.toCustomerId,this.addNewEmail.value.message).subscribe(data=>{
      alert ('Email sent!')
      this.router.navigate(['/trips'])
    }) 
  }

}
