import { IForum } from "../models/forum.model";
import { IMessage } from "../models/message.model";

export interface IForumService {
  askQuestion(eventId: string, message: IMessage): Promise<void>;
  answerQuestion(eventId: string, message: IMessage): Promise<void>;
  getForum(eventId: string): Promise<IForum>;
}

