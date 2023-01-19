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

  parseToDaysStr(daysStr:string) { 
    let dayNumber = daysStr.split('');
    console.log(dayNumber);
    let str=''

    for(let i=0; i<dayNumber.length; i++) {
      if(dayNumber[i]=='1'){
        str+="Monday ";
      }
      else if(dayNumber[i]=='2'){
        str += "Tuesday ";
      }
      else if(dayNumber[i]=='3'){
        str += "Wednesday ";
      }
      else if(dayNumber[i]=='4'){
        str += "Thursday ";
      }
      else if(dayNumber[i]=='5'){
        str += "Friday ";
      }
      else if(dayNumber[i]=='6'){
        str += "Saturday ";
      }
      else if(dayNumber[i]=='7'){
        str += "Sunday ";
      } 

      else if(i != (dayNumber.length-1)) {
        str +=", ";
      }
    }

    return str;
  }
}
