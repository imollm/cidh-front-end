import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Custom components
import { EventSearcherComponent } from './components/event-searcher/event-searcher.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { BannerComponent } from './components/banner/banner.component';
import { TableComponent } from './components/table/table.component';
import { FormatDatePipe } from '../helpers/format-date.pipe';
import { EventDetailComponent } from './components/event/event-detail/event-detail.component';
import { EventRatingComponent } from './components/event-rating/event-rating.component';
import { ForumComponent } from './components/forum/forum.component';
import { QuestionComponent } from './components/question/question.component';
import { AnswerComponent } from './components/answer/answer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CommentComponent } from './components/comment/comment.component';
import { SafeUrlPipe } from '../helpers/safe-url.pipe';

// Third party modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    EventSearcherComponent,
    EventCardComponent,
    BannerComponent,
    TableComponent,
    FormatDatePipe,
    EventDetailComponent,
    EventRatingComponent,
    ForumComponent,
    QuestionComponent,
    AnswerComponent,
    CarouselComponent,
    CommentComponent,
    SafeUrlPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    NgxPaginationModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    CarouselModule,
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
    TableComponent,
    ReactiveFormsModule,
    FormatDatePipe,
    ForumComponent,
    QuestionComponent,
    AnswerComponent,
    SafeUrlPipe
  ]
})
export class SharedModule { }
