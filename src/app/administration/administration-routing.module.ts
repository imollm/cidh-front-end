import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Custom imports
import { AdministrationComponent } from './administration.component';
import { DashboardComponent } from '../profile/components/dashboard/dashboard.component';
import { LinkAdminToEventOrganizerComponent } from './components/event-organizer/link-admin-to-event/link-admin-to-event-organizer.component';
import { EventOrganizerListComponent } from './components/event-organizer/event-organizer-list/event-organizer-list.component';

// Auth Guard
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: AdministrationComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'event-organizer',
        children: [
          { path: 'linkAdminToEventOrganizer', component: LinkAdminToEventOrganizerComponent },
          { path: 'list', component: EventOrganizerListComponent },
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
