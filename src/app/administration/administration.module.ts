import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom imports
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { LinkAdminToEventOrganizerComponent } from './components/link-admin-to-event/link-admin-to-event-organizer.component';
import { CategoryListComponent } from './components/Category/category-list/category-list.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryCreateEditComponent } from './components/Category/category-create-edit/category-create-edit.component';


@NgModule({
  declarations: [
    AdministrationComponent,
    LinkAdminToEventOrganizerComponent,
    CategoryListComponent,
    CategoryCreateEditComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SharedModule
  ]
})
export class AdministrationModule { }
