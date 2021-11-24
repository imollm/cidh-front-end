import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SearcherComponent } from './components/searcher/searcher.component';
import { CardComponent } from './components/card/card.component';
import { BannerComponent } from './components/banner/banner.component';

@NgModule({
  declarations: [
    SearcherComponent,
    CardComponent,
    BannerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    SearcherComponent,
    CardComponent,
    BannerComponent,
  ]
})
export class SharedModule { }
