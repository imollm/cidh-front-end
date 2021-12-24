import { IEventOrganizer } from "../../models/event-organizer.model";

export interface IEventOrganizerService {
    addEventOrganizer(eventOrganizer: IEventOrganizer): Promise<IEventOrganizer>;
    updateEventOrganizer(eventOrganizerId: string, eventOrganizer: IEventOrganizer): Promise<IEventOrganizer>;
    showEventOrganizer(eventOrganizerId: String): Promise<IEventOrganizer>;
    listAllEventOrganizers(): Promise<IEventOrganizer[]>;
}
