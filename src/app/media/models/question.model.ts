import { Answer } from "./answer.model";

export interface Question {
  userId: string;
  eventId: string;
  parentMessageId?: string;
  createdAt: string;
  message: string;
  answer?: Answer;
}
