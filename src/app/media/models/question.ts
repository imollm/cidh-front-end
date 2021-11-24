import { Answer } from "./answer";

export interface Question {
  id: string;
  title: string;
  message: string;
  answer?: Answer;
  eventId: string;
}
