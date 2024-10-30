
import { ProfileComponent } from './profile/profile.component';
import { AccountsComponent } from './accounts/accounts.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { RegisterEventsComponent } from './explore/register-events/register-events.component';
import { AuthGuard } from './services/auth.guard';
import { PreviewEventDetailsComponent } from './event/preview-event-details/preview-event-details.component';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import(`./web/web.module`).then(
      module => module.WebModule
    )
  },
  
 
   { 
    path: '', 
    loadChildren: () => import(`./auth/auth.module`).then(
      module => module.AuthModule
    )
  },
  { 
    path: '', 
    loadChildren: () => import(`./dashboard/dashboard.module`).then(
      module => module.DashboardModule
    )
  },

  { 
    path: '', 
    loadChildren: () => import(`./explore/explore.module`).then(
      module => module.ExploreModule
    )
  },
  
  { 
    path: '', 
    loadChildren: () => import(`./profile/profile.module`).then(
      module => module.ProfileModule
    )
  },
  
  { 
    path: '', 
    loadChildren: () => import(`./event/event.module`).then(
      module => module.EventModule
    )
  },

 
 
 
 
 

 
 
  {
    path: 'account',
    component: AccountsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payment-details',
    component: PaymentDetailsComponent,
    canActivate: [AuthGuard]
  },
 
 
  {
    path: 'preview-publish',
    component: PreviewEventDetailsComponent
  },
  {
    path: 'preview-publish/:id',
    component: PreviewEventDetailsComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'join',
  //   component: JoinNowComponent
  // },
  

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
