import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Custom imports
import { AdministrationComponent } from './administration.component';
import { DashboardComponent } from '../profile/components/dashboard/dashboard.component';
import { EventOrganizerListComponent } from './components/event-organizer/event-organizer-list/event-organizer-list.component';
import { EventOrganizerCreateEditComponent } from './components/event-organizer/event-organizer-create-edit/event-organizer-create-edit.component';
import { EventOrganizerDetailComponent } from './components/event-organizer/event-organizer-detail/event-organizer-detail.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { LabelListComponent } from './components/label/label-list/label-list.component';
import { LabelCreateEditComponent } from './components/label/label-create-edit/label-create-edit.component';
import { AdministratorListComponent } from './components/administrator/administrator-list/administrator-list.component';
import { AdministratorCreateEditComponent } from './components/administrator/administrator-create-edit/administrator-create-edit.component';
import { CategoryCreateEditComponent } from './components/category/category-create-edit/category-create-edit.component';

// Auth Guard
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: AdministrationComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: 'category', 
        children: [
          { path: 'list', component: CategoryListComponent },
          { path: 'create', component: CategoryCreateEditComponent },
          { path: 'edit/:id', component: CategoryCreateEditComponent },
          { path: 'view/:id', component: CategoryCreateEditComponent },
        ]
      },
      {
        path: 'event-organizer',
        children: [
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
          { path: 'delete/:id', component: LabelListComponent }
        ]
      },
      {
        path: 'administrator',
        children: [
          { path: 'list', component: AdministratorListComponent },
          { path: 'create', component: AdministratorCreateEditComponent },
          { path: 'edit/:id', component: AdministratorCreateEditComponent }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
