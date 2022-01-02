import { Category } from "src/app/administration/models/category.model";
import { IEventOrganizer } from "src/app/administration/models/event-organizer.model";
import { Label } from "src/app/administration/models/label.model";
import { IRating } from "./rating.model";
export interface IEvent {
    id?: string;
    name: string;
    headerImage?: string;
    rating?: IRating;
    userRating?: number | null;
    description: string;
    startDate?: number;
    endDate?: number;
    category: Category;
    labels: Label[];
    eventOrganizer: IEventOrganizer;
    eventUrl: string;
    isFavorite?: boolean;
    isUserSubscribed?: boolean;
    ratingAvg: number;
}
