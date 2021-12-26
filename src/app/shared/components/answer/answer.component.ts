import { Component, Input } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Answer } from '../../../media/models/answer.model';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.sass']
})
export class AnswerComponent {

  @Input() answer = {} as Answer | undefined;

  faUser = faUser;

  constructor() { }

}
