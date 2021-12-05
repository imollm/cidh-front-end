import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Custom components
import { EventSearcherComponent } from './components/event-searcher/event-searcher.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { BannerComponent } from './components/banner/banner.component';

// Third party modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { EventResultsComponent } from './components/event-results/event-results.component';

@NgModule({
  declarations: [
    EventSearcherComponent,
    EventCardComponent,
    BannerComponent,
    EventResultsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    NgxPaginationModule,
  ],
  exports: [
    EventSearcherComponent,
    EventCardComponent,
    BannerComponent,
    FontAwesomeModule,
    SweetAlert2Module,
    NgxPaginationModule,
  ]
})
export class SharedModule { }
