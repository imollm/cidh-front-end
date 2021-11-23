import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SearcherComponent } from './components/searcher/searcher.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    SearcherComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    SearcherComponent,
    CardComponent,
  ]
})
export class SharedModule { }
