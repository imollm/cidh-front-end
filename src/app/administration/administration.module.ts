import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom imports
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { LinkAdminToEventOrganizerComponent } from './components/link-admin-to-event/link-admin-to-event-organizer.component';
import { CategoryListComponent } from '../administration/components/Category/categoryList/categoryList.component';


@NgModule({
  declarations: [
    AdministrationComponent,
    LinkAdminToEventOrganizerComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
