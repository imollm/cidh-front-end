import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { LinkAdminToEventComponent } from './components/link-admin-to-event/link-admin-to-event.component';


@NgModule({
  declarations: [
    AdministrationComponent,
    LinkAdminToEventComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
