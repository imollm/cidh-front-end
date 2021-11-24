import { Question } from "../models/question";
import { Answer } from "../models/answer";

export interface IForumService {
  askQuestion(eventId: string, title: string, message: string, userId: string): void;
  answerQuestion(questionId: string, answer: Answer): void;
  listAllQuestions(eventId: string): Question[];
  getAnswer(questionId: string): Answer;
  getQuestion(questionId: string): Question;
}

