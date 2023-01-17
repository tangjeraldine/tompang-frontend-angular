import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderUserComponent } from './header-user/header-user.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderUserComponent,
    HeaderAdminComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FooterComponent,
    HeaderAdminComponent,
    HeaderUserComponent
  ]
})
export class LayoutComponentModule { }
