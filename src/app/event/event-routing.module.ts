import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../profile/components/dashboard/dashboard.component';
import { EventSearcherComponent } from '../shared/components/event-searcher/event-searcher.component';

// Auth Guard
import { AuthGuard } from '../auth/auth.guard';

// Custom imports
import { EventComponent } from './event.component';
import { AccessToEventComponent } from './components/access-to-event/access-to-event.component';

const routes: Routes = [
  { path: '', component: EventComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: 'event',
        children: [
          { path: 'search', component: EventSearcherComponent },
          { path: 'access', component: AccessToEventComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
