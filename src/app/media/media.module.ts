import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { MediaComponent } from './media.component';
import { ForumComponent } from './components/forum/forum.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MediaComponent,
    ForumComponent
  ],
  imports: [
    CommonModule,
    MediaRoutingModule,
    SharedModule,
  ]
})
export class MediaModule { }
