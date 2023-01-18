import { Component, OnInit } from '@angular/core';
import { AddTripService } from '../_services/add-trip.service';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit{

  constructor(private addTripService:AddTripService) {}
  ngOnInit(): void {
      
  }

}
