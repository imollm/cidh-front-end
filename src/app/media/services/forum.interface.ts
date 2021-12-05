import { Question } from "../models/question.model";
import { Answer } from "../models/answer.model";

export interface IForumService {
  askQuestion(question: Question): void;
  answerQuestion(questionId: string, answer: Answer): void;
  listAllQuestions(eventId: string): Question[];
  getAnswer(questionId: string): Answer;
  getQuestion(questionId: string): Question;
}

