import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './profile.component';
import { AuthGuard } from '../auth/auth.guard';
import { HomeComponent as DashboardAdminHomeComponent } from './components/dashboard/admin/home/home.component';
import { HomeComponent as DashboardSuperAdminHomeComponent } from './components/dashboard/super-admin/home/home.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'admin', component: DashboardAdminHomeComponent },
      { path: 'superadmin', component: DashboardSuperAdminHomeComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
