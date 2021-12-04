import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './profile.component';
import { AuthGuard } from '../auth/auth.guard';
import { HomeComponent as DashboardHomeComponent } from './components/dashboard/components/home/home.component';
import { LinkAdminToEventOrganizerComponent } from '../administration/components/link-admin-to-event/link-admin-to-event-organizer.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'home', component: DashboardHomeComponent },
      { path: 'linkAdminToEventOrganizer', component: LinkAdminToEventOrganizerComponent, /* canActivate: [AuthGuard] */ },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
