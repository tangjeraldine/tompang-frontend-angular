import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PublicLandingPgComponent } from './public-landing-pg/public-landing-pg.component';
import { TripComponent } from './trip/trip.component';
import { AuthenticationService } from './_services/authentication.service';
import { RegisterComponent } from './register/register.component';
import { MatInputModule } from '@angular/material/input';
import { LayoutComponentModule } from './layout-component/layout-component.module';
import { ErrorComponent } from './error/error.component';
import { UsersTripListComponent } from './users-trip-list/users-trip-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CookieService } from 'ngx-cookie-service';
import { DiscussionRoomComponent } from './discussion-room/discussion-room.component';
import { StompService } from './_services/stomp.service';
import { TripService } from './_services/trip.service';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListUsersWithSameDestinationComponent } from './list-users-with-same-destination/list-users-with-same-destination.component';
import { EmailComponent } from './email/email.component';

@NgModule({
  declarations: [
    AppComponent,
    PublicLandingPgComponent,
    LoginComponent,
    TripComponent,
    RegisterComponent,
    ErrorComponent,
    UsersTripListComponent,
    DiscussionRoomComponent,
    ListUsersWithSameDestinationComponent,
    EmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LayoutComponentModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthenticationService, CookieService, StompService, TripService],
  bootstrap: [AppComponent],
})
export class AppModule {}
