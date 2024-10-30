import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './footer/footer.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterLandingComponent } from './footer-landing/footer-landing.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    FooterComponent,
    SidenavComponent,
    FooterLandingComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedRoutingModule,
    NgxIntlTelInputModule,
  ],
  exports: [
    FooterComponent,
    SidenavComponent,
    FooterLandingComponent,
    HeaderComponent
 
  ],
})
export class SharedModule { }
