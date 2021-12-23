import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom imports
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { LinkAdminToEventOrganizerComponent } from './components/event-organizer/link-admin-to-event/link-admin-to-event-organizer.component';
import { CategoryListComponent } from './components/category/list/category-list.component';
import { SharedModule } from '../shared/shared.module';
import { EventOrganizerListComponent } from './components/event-organizer/event-organizer-list/event-organizer-list.component';
import { EventOrganizerCreateEditComponent } from './components/event-organizer/event-organizer-create-edit/event-organizer-create-edit.component';
import { EventOrganizerDetailComponent } from './components/event-organizer/event-organizer-detail/event-organizer-detail.component';
import { LabelListComponent } from './components/label/label-list/label-list.component';


@NgModule({
  declarations: [
    AdministrationComponent,
    LinkAdminToEventOrganizerComponent,
    CategoryListComponent,
    EventOrganizerListComponent,
    EventOrganizerCreateEditComponent,
    EventOrganizerDetailComponent,
    LabelListComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SharedModule
  ]
})
export class AdministrationModule { }
