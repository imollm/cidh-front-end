import { IEvent } from "src/app/event/models/event.model";

export interface IFavoriteService {
    addToFavorites(eventId: string): Promise<void>;
    removeToFavorties(eventId: string): Promise<void>;
    listAllFavoritesByUserId(): Promise<IEvent[]>;
    listAllMyFavorites(): Promise<IEvent[]>;
}
