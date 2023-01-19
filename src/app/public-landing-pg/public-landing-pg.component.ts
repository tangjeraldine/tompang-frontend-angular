import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-landing-pg',
  templateUrl: './public-landing-pg.component.html',
  styleUrls: ['./public-landing-pg.component.css'],
})
export class PublicLandingPgComponent implements OnInit {
  showText: boolean = true;

  openOnMouseover() {
    // this.showText = true;
  }

  closeOnMouseout() {
    // this.showText = false;
  }

  constructor() {}

  ngOnInit(): void {}
}
