import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { CaseStudiesComponent } from './case-studies/case-studies.component';

import { DatePipe } from '@angular/common';

//npm-installs
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { OwlDateTimeModule, OwlNativeDateTimeModule,OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgOtpInputModule } from  'ng-otp-input';
import { AccountsComponent } from './accounts/accounts.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SharedModule } from './shared/shared.module';
import { EventModule } from './event/event.module';

export const MY_NATIVE_FORMATS = {
  fullPickerInput: {day: 'numeric',year: 'numeric', month: 'numeric', },
}
@NgModule({
  declarations: [
    AppComponent,
    CaseStudiesComponent,
    AccountsComponent,
    PaymentDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    NgxIntlTelInputModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgOtpInputModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
    SharedModule,
    EventModule,
    TooltipModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      preventDuplicates: true,
      progressBar:true,
      closeButton:true
    }),
    ImageCropperModule
  ],
  providers: [DatePipe,  {provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS},],
  bootstrap: [AppComponent]
})
export class AppModule { }
