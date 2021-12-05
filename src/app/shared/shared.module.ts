import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { SearcherComponent } from './components/searcher/searcher.component';
import { CardComponent } from './components/card/card.component';
import { BannerComponent } from './components/banner/banner.component';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    SearcherComponent,
    CardComponent,
    BannerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    NgxPaginationModule,
  ],
  exports: [
    SearcherComponent,
    CardComponent,
    BannerComponent,
    FontAwesomeModule,
    SweetAlert2Module,
    NgxPaginationModule,
  ]
})
export class SharedModule { }
