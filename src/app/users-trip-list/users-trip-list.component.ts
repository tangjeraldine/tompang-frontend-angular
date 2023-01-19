import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { TripService } from '../_services/trip.service';


@Component({
  selector: 'app-users-trip-list',
  templateUrl: './users-trip-list.component.html', 
  styleUrls: ['./users-trip-list.component.css']
})
export class UsersTripListComponent {

  trip_list:any=[];
  edit_row_index = -1;
  edit_from_postal="";
  edit_to_postal="";
  edit_description=""; 
  edit_role="";
  edit_days=[false,false,false,false,false,false,false];
  edit_time_of_day="";

  edit_from_postal_error = "";
  edit_to_postal_error = "";
  edit_description_error = "";
  edit_days_error = ""; 
  
  constructor(private router:Router,
              private _tripService:TripService,
              private _authService:AuthenticationService) {}

  ngOnInit() {
    if (this._authService.isCredentialsEmpty() || !this._authService.isCustomerRole()) {
      this.router.navigate(['/login', { expired: '1' }]);
      return;
    } 

    this._tripService.getTrips().subscribe(
      (data:any)=>{ 
        this.trip_list = data;   
      },
      (error)=> {
        this.router.navigate(['/login', {expired:'1'}]) 
      }
    )
  }

  update() {
    this.edit_from_postal_error = "";
    this.edit_to_postal_error = ""; 
    this.edit_description_error = "";
    this.edit_days_error = "";

    //Validation before updating
    var regex = /^[0-9]{6}$/;
    if(!regex.test(this.edit_from_postal)) {
      this.edit_from_postal_error = "Please enter a valid postal code";
    }

    if(!regex.test(this.edit_to_postal)) {
      this.edit_to_postal_error = "Please enter a valid postal code";
    }

    this.edit_description = this.edit_description.trim();
    if(this.edit_description == "") {
      this.edit_description_error = "Please enter a description";
    }
 
    var edit_days_csv = this.parseToDaysCsv(this.edit_days);
    if(edit_days_csv == "") {
      this.edit_days_error = "Please select at least 1 day";
    }
 
    if(!(this.edit_from_postal_error == "" && 
         this.edit_to_postal_error == "" && 
         this.edit_description_error == "" &&
         this.edit_days_error == "")) {
      return;
    }

    this._tripService.updateTrip(this.trip_list[this.edit_row_index].id, 
                                 this.edit_from_postal,
                                 this.edit_to_postal,
                                 this.edit_description,
                                 this.edit_role,
                                 edit_days_csv,
                                 this.edit_time_of_day).subscribe((data:any)=> { 

        this.trip_list[this.edit_row_index].fromPostal = this.edit_from_postal;     
        this.trip_list[this.edit_row_index].toPostal = this.edit_to_postal;   
        this.trip_list[this.edit_row_index].description = this.edit_description;  
        this.trip_list[this.edit_row_index].role = this.edit_role;     
        this.trip_list[this.edit_row_index].days = edit_days_csv;   
        this.trip_list[this.edit_row_index].timeOfDay = this.edit_time_of_day;
        this.edit_row_index = -1;        
    },
    (error)=>{ 
      this.edit_row_index = -1; 
      this.router.navigate(['/login', { expired: '1' }]); 
    });
  }

  delete(index:number) {
    var cfm = confirm("Confirm delete?");
    if(cfm) {
      this._tripService.deleteTrip(this.trip_list[index].id).subscribe(
      (data)=>{
        var obj:Array<any> = <Array<any>>this.trip_list;
        obj.splice(index, 1);
      },
      (error)=>{
        alert("Cannot delete, please try again!");
      })
    }
  }

  parseToDaysCsv(ary:any) {
    let ret = "";
    for(let i=0;i<ary.length;i++) {
      if(ary[i]) {
        ret += ((i+1) + "");
      }
    }

    return ret;
  }

  cancelEdit() {
    this.edit_row_index = -1;
    this.edit_from_postal_error = "";
    this.edit_to_postal_error = ""; 
    this.edit_description_error = "";
    this.edit_days_error = ""; 

    this.edit_from_postal="";
    this.edit_to_postal="";
    this.edit_description=""; 
    this.edit_role="";
    this.edit_days=[false,false,false,false,false,false,false];
    this.edit_time_of_day="";
  }

  edit(index:number) {
    this.edit_row_index = index; 

    this.edit_from_postal = this.trip_list[index].fromPostal;
    this.edit_to_postal = this.trip_list[index].toPostal;
    this.edit_description = this.trip_list[index].description;
    this.edit_role = this.trip_list[index].role; 
 
    for(let i=1;i<=7;i++) {
      this.edit_days[i-1] = this.trip_list[index].days.includes(i);
    } 

    this.edit_time_of_day = this.trip_list[index].timeOfDay;
  }

  contains(src:string, val:string) {
    return src.includes(val);
  }

  editRole(val:any) {
    this.edit_role = val; 
  }

  editTimeOfDay(val:any) {
    this.edit_time_of_day = val;
  }

  parseTimeOfDay(timeOfDay:string) {
    if(timeOfDay == "1") {
      return "Morning";
    }
    else if(timeOfDay == "2") {
      return "Afternoon";
    }
    else if(timeOfDay == "3"){
      return "Evening";
    }

    return "";
  }

  parseToDaysStr(daysStr:string) { 

    var str = "";
    for(let i=0; i<daysStr.length; i++) {
      if(daysStr.charAt(i)=='1'){
        str += "Monday";
      }
      else if(daysStr.charAt(i)=='2'){
        str += "Tuesday";
      }
      else if(daysStr.charAt(i)=='3'){
        str += "Wednesday";
      }
      else if(daysStr.charAt(i)=='4'){
        str += "Thurday";
      }
      else if(daysStr.charAt(i)=='5'){
        str += "Friday";
      }
      else if(daysStr.charAt(i)=='6'){
        str += "Saturday";
      }
      else if(daysStr.charAt(i)=='7'){
        str += "Sunday";
      } 

      if(i != (daysStr.length-1)) {

        str +=", ";
      }
    }

    return str;

  }

  findUsers(fromPostal:string, toPostal:string, days:string, timeOfDay:string) {
    this.router.navigate(['/show-same-trip', fromPostal, toPostal, days, timeOfDay]);
  }
}