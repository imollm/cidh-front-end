import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Custom imports
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LabelsComponent } from './components/labels/labels.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EventDetailComponent } from './shared/components/event/event-detail/event-detail.component';
import { EventSearcherComponent } from './shared/components/event-searcher/event-searcher.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'labels', component: LabelsComponent },
  { path: 'search', component: EventSearcherComponent },
  { path: 'administration', loadChildren: () => import('./administration/administration.module').then(m => m .AdministrationModule) },
  { path: 'event', loadChildren: () => import('./event/event.module').then(m => m.EventModule) },
  { path: 'media', loadChildren: () => import('./media/media.module').then(m => m.MediaModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  { path: 'event-detail/:id', component: EventDetailComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
