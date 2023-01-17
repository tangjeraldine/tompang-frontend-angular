import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { TripComponent } from './trip/trip.component';
import { RegisterComponent } from './register/register.component';
import { PublicLandingPgComponent } from './public-landing-pg/public-landing-pg.component';
import { UsersLandingPgComponent } from './users/users-landing-pg/users-landing-pg.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLandingPgComponent,
  },
  {
    path: 'users',
    children: [{ path: '', component: UsersLandingPgComponent }],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'trip', component: TripComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
