import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../profile/components/dashboard/dashboard.component';

// Custom imports
import { ForumComponent } from '../shared/components/forum/forum.component';
import { FavoriteListComponent } from './components/favorite/favorite-list/favorite-list.component';
import { MediaComponent } from './media.component';

// Auth Guard
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: MediaComponent },
  { path: 'forum', component: ForumComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: 'favorite',
        children: [
          { path: 'list', component: FavoriteListComponent }
        ]
      },
      { path: 'forum', component: ForumComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule { }
