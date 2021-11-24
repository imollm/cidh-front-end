import { Question } from "../models/question";
import { Answer } from "../models/answer";

export interface IForumService {
  askQuestion(question: Question): void;
  answerQuestion(questionId: string, answer: Answer): void;
  listAllQuestions(eventId: string): Question[];
  getAnswer(questionId: string): Answer;
  getQuestion(questionId: string): Question;
}

