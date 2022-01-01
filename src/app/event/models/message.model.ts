export interface IMessage {
    id: string;
    authorUserId: string;
    authorFirstName: string;
    createdAt: number;
    parentMessageId: string;
    message: string
}