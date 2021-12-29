import { Category } from "src/app/administration/models/category.model";
import { IEventOrganizer } from "src/app/administration/models/event-organizer.model";
import { Label } from "src/app/administration/models/label.model";
import { Question } from "src/app/media/models/question.model";
import { IUser } from "./user.model";

export interface IEvent {
    id?: string;
    name: string;
    description: string;
    headerImage?: string;
    location: string;
    startDate?: Date;
    endDate?: Date;
    category: Category;
    labels: Label[];
    eventOrganizer: IEventOrganizer;
    rating: Number;
    labelIds: string[];
    eventUrl: string;
}
