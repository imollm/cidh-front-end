import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent as DashboardAdminHomeComponent } from './components/dashboard/admin/home/home.component';
import { HomeComponent as DashboardSuperAdminHomeComponent } from './components/dashboard/super-admin/home/home.component';
import { HomeComponent as DashboardUserHomeComponent } from './components/dashboard/user/home/home.component';

@NgModule({
  declarations: [
    ProfileComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    DashboardAdminHomeComponent,
    DashboardSuperAdminHomeComponent,
    DashboardUserHomeComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ProfileModule { }
