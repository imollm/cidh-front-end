import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Custom imports
import { AdministrationComponent } from './administration.component';
import { DashboardComponent } from '../profile/components/dashboard/dashboard.component';
import { LinkAdminToEventOrganizerComponent } from './components/event-organizer/link-admin-to-event/link-admin-to-event-organizer.component';
import { EventOrganizerListComponent } from './components/event-organizer/event-organizer-list/event-organizer-list.component';
import { EventOrganizerCreateEditComponent } from './components/event-organizer/event-organizer-create-edit/event-organizer-create-edit.component';
import { EventOrganizerDetailComponent } from './components/event-organizer/event-organizer-detail/event-organizer-detail.component';
import { CategoryListComponent } from './components/category/list/category-list.component';
import { LabelListComponent } from './components/label/label-list/label-list.component';
import { LabelCreateEditComponent } from './components/label/label-create-edit/label-create-edit.component';
import { LabelDeleteComponent } from './components/label/label-delete/label-delete.component';

// Auth Guard
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: AdministrationComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: 'linkAdminToEventOrganizer', component: LinkAdminToEventOrganizerComponent },
      { path: 'category', 
        children: [
          { path: 'list', component: CategoryListComponent },
        ]
      },
      {
        path: 'event-organizer',
        children: [
          { path: 'linkAdminToEventOrganizer', component: LinkAdminToEventOrganizerComponent },
          { path: 'list', component: EventOrganizerListComponent },
          { path: 'create', component: EventOrganizerCreateEditComponent },
          { path: 'edit/:id', component: EventOrganizerCreateEditComponent },
          { path: 'view/:id', component: EventOrganizerDetailComponent }
        ]
      },
      {
        path: 'labels',
        children: [
          { path: 'list', component: LabelListComponent },
          { path: 'create', component: LabelCreateEditComponent },
          { path: 'edit/:id', component: LabelCreateEditComponent },
          { path: 'view/:id' },
          { path: 'delete/:id', component: LabelDeleteComponent }
        ]
      }
    ]
  
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
