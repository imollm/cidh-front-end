import { IMessage } from "./message.model";

export interface IForum {
    eventId: string;
    eventName: string;
    messages: IMessage[];
}
