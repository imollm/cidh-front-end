import { IMessage } from "./message.model";

export interface IEventForum {
    eventId: string;
    eventName: string;
    messages: IMessage[];
}