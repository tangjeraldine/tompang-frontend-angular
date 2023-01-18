import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { TripComponent } from './trip/trip.component';
import { RegisterComponent } from './register/register.component';
import { PublicLandingPgComponent } from './public-landing-pg/public-landing-pg.component';
import { UsersLandingPgComponent } from './users-landing-pg/users-landing-pg.component';
import { ErrorComponent } from './error/error.component';
import { UsersTripListComponent } from './users-trip-list/users-trip-list.component';
import { EmailVerificationPgComponent } from './email-verification-pg/email-verification-pg.component';

const routes: Routes = [
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
    // children: [{ path: '/examplepage', component: UsersLandingPgComponent }],
  },
  {
    path: 'users',
    component: UsersLandingPgComponent,
  },
  {
    path: 'trip-list',
    component: UsersTripListComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
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
