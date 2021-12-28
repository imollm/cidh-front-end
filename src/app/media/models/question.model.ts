import { Answer } from "./answer.model";

export interface Question {
  userId: string;
  eventId: string;
  parentId?: string;
  createdAt: string;
  comment: string;
  answer?: Answer;
}
