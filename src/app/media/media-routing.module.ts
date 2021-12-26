import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Custom imports
import { ForumComponent } from '../shared/components/forum/forum.component';
import { MediaComponent } from './media.component';

const routes: Routes = [
  { path: '', component: MediaComponent },
  { path: 'forum', component: ForumComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule { }
