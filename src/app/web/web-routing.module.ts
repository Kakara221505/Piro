import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BookDemoChristmasComponent } from './book-demo-christmas/book-demo-christmas.component';
import { MetaverseComponent } from './metaverse/metaverse.component';
import { DemoBookPageComponent } from './demo-book-page/demo-book-page.component';

const routes: Routes = [
  {
    path: '',
    component: MetaverseComponent
  },
  {
    path: 'landing',
    component: LandingPageComponent
  },
  {
    path: 'book-demo-christmas',
    component: BookDemoChristmasComponent
  },
  {
    path: 'book-demo',
    component: DemoBookPageComponent
  },
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
