import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
