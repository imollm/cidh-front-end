import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Custom components
import { EventSearcherComponent } from './components/event-searcher/event-searcher.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { BannerComponent } from './components/banner/banner.component';
import { TableComponent } from './components/table/table.component';

// Third party modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { EventResultsComponent } from './components/event-results/event-results.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    EventSearcherComponent,
    EventCardComponent,
    BannerComponent,
    EventResultsComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    NgxPaginationModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    EventSearcherComponent,
    EventCardComponent,
    BannerComponent,
    FontAwesomeModule,
    SweetAlert2Module,
    NgxPaginationModule,
    NgxSpinnerModule,
    TableComponent
  ]
})
export class SharedModule { }
