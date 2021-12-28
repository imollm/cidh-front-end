import { Injectable } from '@angular/core';
import { Answer } from '../models/answer.model';
import { Question } from '../models/question.model';
import { IForumService } from './forum.interface';

@Injectable({
  providedIn: 'root'
})
export class ForumService implements IForumService {

  fakeQuestions: Question[] = [];

  constructor() { }

  askQuestion(question: Question): void {

  }

  answerQuestion(questionId: string, answer: Answer): void { }

  listAllQuestions(eventId: string): Question[] {
    return [];
  }
  getAnswer(questionId: string): Answer {
    const answer = {} as Answer;
    return answer;
  }
  getQuestion(questionId: string): Question {
    const question = {} as Question;
    return question;
  }
}
