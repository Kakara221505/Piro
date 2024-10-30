import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { ListEventsComponent } from './list-events/list-events.component';
import { SharedModule } from '../shared/shared.module';
import { EventManagementConsoleComponent } from './event-management-console/event-management-console.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChooseEventComponent } from './choose-event/choose-event.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AddInviteesComponent } from './add-invitees/add-invitees.component';
import { AddEventSessionComponent } from './add-event-session/add-event-session.component';
import { AccessManagementComponent } from './access-management/access-management.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { ManageSpaceComponent } from './manage-space/manage-space.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ViewEventComponent } from './view-event/view-event.component';
import { AddEventManagementConsoleComponent } from './add-event-management-console/add-event-management-console.component';
import { JoinNowComponent } from './join-now/join-now.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { UpdateChooseEventComponent } from './update-choose-event/update-choose-event.component';
import { PreviewEventDetailsComponent } from './preview-event-details/preview-event-details.component';
import { MaxLimitComponent } from './max-limit/max-limit.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    ListEventsComponent,
    EventManagementConsoleComponent,
    ChooseEventComponent,
    BasicDetailsComponent,
    AddInviteesComponent,
    AddEventSessionComponent,
    AccessManagementComponent,
    RoleManagementComponent,
    ManageSpaceComponent,
    ViewEventComponent,
    AddEventManagementConsoleComponent,
    JoinNowComponent,
    UpdateChooseEventComponent,
    PreviewEventDetailsComponent,
    MaxLimitComponent,
  ],
  imports: [
    CommonModule,
    
    EventRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
    NgSelectModule,
    NgxSpinnerModule,
    OwlDateTimeModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      preventDuplicates: true,
      progressBar:true,
      closeButton:true
    }),
    OwlNativeDateTimeModule,
    ImageCropperModule,
    NgOtpInputModule,

    

  ],
  exports: [
   BasicDetailsComponent,
   AddInviteesComponent,
   AddEventSessionComponent,
   AccessManagementComponent,
   RoleManagementComponent,
   ManageSpaceComponent
 
  ],
})
export class EventModule { }
