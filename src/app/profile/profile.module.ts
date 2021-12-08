import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Custom imports
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent as DashboardHeaderComponent } from './components/dashboard/layout/header/header.component';
import { SideMenuComponent as DashboardSideMenuComponent } from './components/dashboard/layout/side-menu/side-menu.component';
import { HomeComponent as DashboardHomeComponent} from './components/dashboard/components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileShowComponent } from './components/dashboard/components/profile-show/profile-show.component';

@NgModule({
  declarations: [
    ProfileComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    DashboardSideMenuComponent,
    DashboardHomeComponent,
    ProfileShowComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProfileModule { }
