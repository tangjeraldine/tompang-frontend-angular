import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private sameDestUsersService:SameDestinationUsersService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.fromPostal=this.route.snapshot.params['fromPostal']
    this.toPostal=this.route.snapshot.params['toPostal']
    this.days=this.route.snapshot.params['days']
    this.days=this.route.snapshot.params['timeOfDay']


    this.sameDestUsersService.listUsersWithSameTrips(this.fromPostal, this.toPostal, this.days, this.timeOfDay).subscribe(data=>{
      this.sameDestTrips=data
    })


  }


}
