import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Custom imports
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './profile.component';
import { HomeComponent as DashboardHomeComponent } from './components/dashboard/components/home/home.component';
import { ProfileShowComponent } from './components/dashboard/components/profile-show/profile-show.component';
import { LogoutComponent } from './components/dashboard/components/logout/logout.component';

// Auth Guard
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: 'home', component: DashboardHomeComponent },
      { path: 'userprofile', component: ProfileShowComponent},
      { path: 'logout', component: LogoutComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
