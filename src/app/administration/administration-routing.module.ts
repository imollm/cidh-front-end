import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration.component';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardComponent } from '../profile/components/dashboard/dashboard.component';
import { LinkAdminToEventOrganizerComponent } from '../administration/components/link-admin-to-event/link-admin-to-event-organizer.component';

const routes: Routes = [
  { path: '', component: AdministrationComponent },
  { path: 'dashboard', component: DashboardComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'linkAdminToEventOrganizer', component: LinkAdminToEventOrganizerComponent, /* canActivate: [AuthGuard] */ },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
