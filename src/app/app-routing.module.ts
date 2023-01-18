import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TripComponent } from './trip/trip.component';
import { RegisterComponent } from './register/register.component';
import { PublicLandingPgComponent } from './public-landing-pg/public-landing-pg.component';
import { ErrorComponent } from './error/error.component';
import { EmailVerificationPgComponent } from './email-verification-pg/email-verification-pg.component';
import { DiscussionRoomComponent } from './discussion-room/discussion-room.component';
import { UsersTripListComponent } from './users-trip-list/users-trip-list.component';
const routes: Routes = [
  {
    path: 'viewUserWithSameDest/:fromPost/toPost',
    component: PublicLandingPgComponent,
  },
  {
    path: '',
    component: PublicLandingPgComponent,
  },
  {
    path: 'email-verif',
    component: EmailVerificationPgComponent,
  },
  {
    path: 'trip',
    component: TripComponent,

    children: [
      {
        path: 'trip-list',
        component: UsersTripListComponent,
      },
    ],
  },
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