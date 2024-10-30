import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEventsComponent } from './list-events/list-events.component';
import { AuthGuard } from '../services/auth.guard';
import { EventManagementConsoleComponent } from './event-management-console/event-management-console.component';
import { ChooseEventComponent } from './choose-event/choose-event.component';
import { ViewEventComponent } from './view-event/view-event.component';
import { AddEventManagementConsoleComponent } from './add-event-management-console/add-event-management-console.component';
import { JoinNowComponent } from './join-now/join-now.component';
import { UpdateChooseEventComponent } from './update-choose-event/update-choose-event.component';
import { SearchExploreComponent } from './search-explore/search-explore.component';
import { MaxLimitComponent } from './max-limit/max-limit.component';

const routes: Routes = [
  
  {
    path: 'all-events',
    component: ListEventsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'event-management-console',
    component: EventManagementConsoleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'choose-event',
    component: ChooseEventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view-event/:id',
    component: ViewEventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update-choose-event',
    component: UpdateChooseEventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    component: SearchExploreComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update-choose-event/:id',
    component: UpdateChooseEventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'join/:id',
    component: JoinNowComponent
  },
 
  {
    path: 'maximum-user',
    component:  MaxLimitComponent
  },
  {
    path: 'add-events',
    component: AddEventManagementConsoleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-events/:tab',
    component: AddEventManagementConsoleComponent
  },
  {
    path: 'add-events/:tab/:id',
    component: AddEventManagementConsoleComponent,
    canActivate: [AuthGuard]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
