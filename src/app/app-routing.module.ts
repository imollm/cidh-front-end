import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';

import { HomeComponent } from './components/home/home.component';
import { LabelsComponent } from './components/labels/labels.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path:'home', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'labels', component: LabelsComponent },
  { path: 'administration', loadChildren: () => import('./administration/administration.module').then(m => m .AdministrationModule) },
  { path: 'event', loadChildren: () => import('./event/event.module').then(m => m.EventModule) },
  { path: 'media', loadChildren: () => import('./media/media.module').then(m => m.MediaModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
