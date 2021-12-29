import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Custom imports
import { AdministrationComponent } from './administration.component';
import { DashboardComponent } from '../profile/components/dashboard/dashboard.component';
import { LinkAdminToEventOrganizerComponent } from '../administration/components/link-admin-to-event/link-admin-to-event-organizer.component';

// Auth Guard
import { AuthGuard } from '../auth/auth.guard';
import { CategoryListComponent } from './components/Category/category-list/category-list.component';
import { CategoryCreateEditComponent } from './components/Category/category-create-edit/category-create-edit.component';

const routes: Routes = [
  { path: '', component: AdministrationComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'linkAdminToEventOrganizer',
        component:
          LinkAdminToEventOrganizerComponent /* canActivate: [AuthGuard] */,
      },
      {
        path: 'category',
        children: [
          { path: 'list', component: CategoryListComponent },
          { path: 'create', component: CategoryCreateEditComponent },
          { path: 'edit/:id', component: CategoryCreateEditComponent },
          { path: 'view/:id', component: CategoryCreateEditComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
