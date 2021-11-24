import { Component, Input, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Answer } from '../../models/answer';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.sass']
})
export class AnswerComponent implements OnInit {

  @Input() answer = {} as Answer | undefined;

  faUser = faUser;

  constructor() { }

  ngOnInit(): void {
  }

}
