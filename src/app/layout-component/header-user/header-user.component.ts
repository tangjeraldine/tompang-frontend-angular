import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {

  constructor(private _authService : AuthenticationService, private router: Router) {}
  
  ngOnInit(): void {
    this._authService  
  }
  logOut() {
    this._authService.clearCredentials();
    this.router.navigateByUrl("/");
  }
}
