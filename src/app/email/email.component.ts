import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { CustomerService } from '../_services/customer.service';

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
  

  constructor(private authService:AuthenticationService, private customerService: CustomerService, private route:ActivatedRoute, private router:Router, private addNewEmailFB: FormBuilder,) {}
  ngOnInit(): void {
    this.toCustomerId=this.route.snapshot.params['id']
    this.customerService.getCustomerById(this.toCustomerId).subscribe(data=>{
      this.toCustomer=data;
    })

    this.userId=this.authService.generateAuthHeaders()['header_id'];
    this.customerService.getCustomerById(this.toCustomerId).subscribe(data=>{
      this.toCustomer=data;
    })

    this.addNewEmail = this.addNewEmailFB.group({
      toEmail: new FormControl(this.toCustomer.email),
      message: new FormControl(''),
    });
  }

  sendEmail() {
    
  }

}
