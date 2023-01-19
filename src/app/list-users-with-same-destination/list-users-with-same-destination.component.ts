import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { SameDestinationUsersService } from '../_services/same-destination-users.service';

@Component({
  selector: 'app-list-users-with-same-destination',
  templateUrl: './list-users-with-same-destination.component.html',
  styleUrls: ['./list-users-with-same-destination.component.css']
})
export class ListUsersWithSameDestinationComponent implements OnInit{

  sameDestTrips:any
  fromPostal: string='';
  toPostal: string='';
  days: string='';
  timeOfDay: string='';
  constructor(private sameDestUsersService:SameDestinationUsersService,
              private route:ActivatedRoute, 
              private _authService:AuthenticationService,
              private router:Router,
              ){}
  ngOnInit(): void {
    if(this._authService.isCredentialsEmpty() || !this._authService.isCustomerRole()) {
      this.router.navigate(['login', {expired:'1'}]);
      return;
    }

    this.fromPostal=this.route.snapshot.params['fromPostal']
    this.toPostal=this.route.snapshot.params['toPostal']
    this.days=this.route.snapshot.params['days']
    this.timeOfDay=this.route.snapshot.params['timeofday']


    this.sameDestUsersService.listUsersWithSameTrips(this.fromPostal, this.toPostal, this.days, this.timeOfDay).subscribe(data=>{
      // alert('hello')
      this.sameDestTrips=data
    })


  }

  sendEmail(id:any) {
    this.router.navigate(['/email'], id)

  }


}
