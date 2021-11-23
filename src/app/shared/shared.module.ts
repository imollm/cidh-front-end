import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SearcherComponent } from './components/searcher/searcher.component';

@NgModule({
  declarations: [
    SearcherComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    SearcherComponent,
  ]
})
export class SharedModule { }
