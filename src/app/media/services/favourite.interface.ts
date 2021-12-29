import { IEvent } from "src/app/event/models/event.model";

export interface IFavouriteService {
    addToFavourites(eventId: string): Promise<void>;
    removeToFavourties(eventId: string): Promise<void>;
    listAllFavouritesByUserId(): Promise<IEvent[]>;
    listAllMyFavourites(): Promise<IEvent[]>;
}
