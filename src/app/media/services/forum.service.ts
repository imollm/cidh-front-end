import { Injectable } from '@angular/core';
import { Answer } from '../models/answer';
import { Question } from '../models/question';
import { IForumService } from './IForumService';
import * as faker from 'faker';

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
    return this.makeFakeQuestions();
  }
  getAnswer(questionId: string): Answer {
    const answer = {} as Answer;
    return answer;
  }
  getQuestion(questionId: string): Question {
    const question = {} as Question;
    return question;
  }

  private makeFakeQuestions(): Question[] {
    const questions: Question[] = [];
    for (let i = 0; i < 10; i++) {
      const question = {} as Question;
      question.id = faker.datatype.uuid();
      question.title = faker.name.title();
      question.message = faker.lorem.sentence();
      questions.push(question);
    }
    return questions;
  }
}
