import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PublicLandingPgComponent } from './public-landing-pg/public-landing-pg.component';
import { TripComponent } from './trip/trip.component';
import { AuthenticationService } from './_services/authentication.service';
import { RegisterComponent } from './register/register.component';
import { LayoutComponentModule } from './layout-component/layout-component.module';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    PublicLandingPgComponent,
    LoginComponent,
    TripComponent,
    RegisterComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LayoutComponentModule,
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
