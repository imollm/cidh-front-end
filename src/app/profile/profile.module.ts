import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent as DashboardHeaderComponent } from './dashboard/layout/header/header.component';
import { SideMenuComponent as DashboardSideMenuComponent } from './dashboard/layout/side-menu/side-menu.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/dashboard/home/home.component';

@NgModule({
  declarations: [
    ProfileComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    DashboardSideMenuComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProfileModule { }
