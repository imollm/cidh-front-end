import { IComment } from "../models/comment.model";

export interface ICommentService {
    sendComment(eventId: string, comment: IComment): Promise<void>;
    addRating(eventId: string, rating: number): Promise<void>;
}
