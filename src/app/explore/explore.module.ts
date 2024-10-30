import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { RegisterEventsComponent } from './register-events/register-events.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ExploreComponent,
    RegisterEventsComponent
  ],
  imports: [
    CommonModule,
    ExploreRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
    NgxIntlTelInputModule,
    NgxSpinnerModule,
    NgSelectModule,
  ]
})
export class ExploreModule { }
