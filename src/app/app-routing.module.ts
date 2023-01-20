import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TripComponent } from './trip/trip.component';
import { RegisterComponent } from './register/register.component';
import { PublicLandingPgComponent } from './public-landing-pg/public-landing-pg.component';
import { ErrorComponent } from './error/error.component';
import { DiscussionRoomComponent } from './discussion-room/discussion-room.component';
import { UsersTripListComponent } from './users-trip-list/users-trip-list.component';
import { ListUsersWithSameDestinationComponent } from './list-users-with-same-destination/list-users-with-same-destination.component';
import { EmailComponent } from './email/email.component';

// Author: Jeraldine

const routes: Routes = [
  {
    path: 'email/:id',
    component: EmailComponent,
  },
  {
    path: 'show-same-trip/:fromPostal/:toPostal/:days/:timeofday',
    component: ListUsersWithSameDestinationComponent,
  },
  {
    path: '',
    component: PublicLandingPgComponent,
  },
  {
    path: 'home',
    component: PublicLandingPgComponent,
  },
  {
    path: 'trip',
    component: TripComponent,
  },
  { path: 'trips', component: UsersTripListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'discussion-room', component: DiscussionRoomComponent },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
