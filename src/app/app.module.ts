import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PublicLandingPgComponent } from './public-landing-pg/public-landing-pg.component';
import { UsersLandingPgComponent } from './users/users-landing-pg/users-landing-pg.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PublicLandingPgComponent,
    UsersLandingPgComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
