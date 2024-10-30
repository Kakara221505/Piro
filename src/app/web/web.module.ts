import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { BookDemoComponent } from './book-demo/book-demo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BookDemoChristmasComponent } from './book-demo-christmas/book-demo-christmas.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { EventManagementComponent } from './event-management/event-management.component';
import { MetaverseComponent } from './metaverse/metaverse.component';
import { KeyFeaturesComponent } from './key-features/key-features.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { DemoBookPageComponent } from './demo-book-page/demo-book-page.component';


@NgModule({
  declarations: [
    BookDemoComponent,
    BookDemoChristmasComponent,
    LandingPageComponent,
    EventManagementComponent,
    MetaverseComponent,
    KeyFeaturesComponent,
   DemoBookPageComponent

  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxSpinnerModule,
    NgxIntlTelInputModule,

  ]
})
export class WebModule { }
