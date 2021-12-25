import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom imports
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { CategoryListComponent } from './components/category/list/category-list.component';
import { SharedModule } from '../shared/shared.module';
import { EventOrganizerListComponent } from './components/event-organizer/event-organizer-list/event-organizer-list.component';
import { EventOrganizerCreateEditComponent } from './components/event-organizer/event-organizer-create-edit/event-organizer-create-edit.component';
import { EventOrganizerDetailComponent } from './components/event-organizer/event-organizer-detail/event-organizer-detail.component';
import { LabelListComponent } from './components/label/label-list/label-list.component';
import { LabelCreateEditComponent } from './components/label/label-create-edit/label-create-edit.component';
import { AdministratorListComponent } from './components/administrator/administrator-list/administrator-list.component';
import { AdministratorCreateEditComponent } from './components/administrator/administrator-create-edit/administrator-create-edit.component';

@NgModule({
  declarations: [
    AdministrationComponent,
    CategoryListComponent,
    EventOrganizerListComponent,
    EventOrganizerCreateEditComponent,
    EventOrganizerDetailComponent,
    LabelListComponent,
    LabelCreateEditComponent,
    AdministratorListComponent,
    AdministratorCreateEditComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SharedModule
  ]
})
export class AdministrationModule { }
