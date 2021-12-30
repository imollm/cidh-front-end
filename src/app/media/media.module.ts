import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom imports
import { MediaRoutingModule } from './media-routing.module';
import { MediaComponent } from './media.component';
import { SharedModule } from '../shared/shared.module';
import { FavoriteListComponent } from './components/favorite/favorite-list/favorite-list.component';

@NgModule({
  declarations: [
    MediaComponent,
    FavoriteListComponent,
  ],
  imports: [
    CommonModule,
    MediaRoutingModule,
    SharedModule,
  ]
})
export class MediaModule { }
