import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderUserComponent } from './header-user/header-user.component';

@NgModule({
  declarations: [FooterComponent, HeaderUserComponent],
  imports: [CommonModule],
  exports: [FooterComponent, HeaderUserComponent],
})
export class LayoutComponentModule {}
