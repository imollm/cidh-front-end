import { Category } from "src/app/administration/models/category.model";
import { IEventOrganizer } from "src/app/administration/models/event-organizer.model";
import { Label } from "src/app/administration/models/label.model";
export interface IEvent {
    id?: string;
    name: string;
    description: string;
    headerImage?: string;
    rating?: number;
    location: string;
    startDate?: Date;
    endDate?: Date;
    category: Category;
    labels: Label[];
    eventOrganizer: IEventOrganizer;
    labelIds: string[];
    eventUrl: string;

}
