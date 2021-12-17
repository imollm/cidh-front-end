import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom imports
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { LinkAdminToEventOrganizerComponent } from './components/event-organizer/link-admin-to-event/link-admin-to-event-organizer.component';
import { EventOrganizerListComponent } from './components/event-organizer/event-organizer-list/event-organizer-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdministrationComponent,
    LinkAdminToEventOrganizerComponent,
    EventOrganizerListComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SharedModule
  ]
})
export class AdministrationModule { }
