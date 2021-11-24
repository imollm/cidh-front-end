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
      question.id = i;
      question.title = `Question ${i}`;
      question.message = `Message ${i}`;
      questions.push(question);
    }
    return questions;
  }
}