import { Answer } from "./answer.model";

export interface Question {
  id: string;
  title: string;
  message: string;
  answer?: Answer;
  eventId: string;
}
