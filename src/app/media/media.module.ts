import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaRoutingModule } from './media-routing.module';

// Custom
import { MediaComponent } from './media.component';
import { ForumComponent } from './components/forum/forum.component';
import { SharedModule } from '../shared/shared.module';
import { QuestionComponent } from './components/question/question.component';
import { AnswerComponent } from './components/answer/answer.component';

@NgModule({
  declarations: [
    MediaComponent,
    ForumComponent,
    QuestionComponent,
    AnswerComponent
  ],
  imports: [
    CommonModule,
    MediaRoutingModule,
    SharedModule,
  ]
})
export class MediaModule { }
