import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../_services/customer.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit{

  id!:number;
  toCustomer:any
  user:any

  constructor(private customerService: CustomerService, private route:ActivatedRoute, private router:Router) {}
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id']
    this.customerService.getCustomerById(this.id).subscribe(data=>{
      this.toCustomer=data;
    })

  }

}
