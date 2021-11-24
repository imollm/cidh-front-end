import { Injectable } from '@angular/core';
import { Answer } from '../models/answer';
import { Question } from '../models/question';
import { IForumService } from './IForumService';

@Injectable({
  providedIn: 'root'
})
export class ForumService implements IForumService {

  fakeQuestions: Question[] = [];

  constructor() { }

  askQuestion(eventId: string, title: string, message: string, userId: string): void { }

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
