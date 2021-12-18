import { IEventOrganizer } from "../../models/event-organizer.model";

export interface IEventOrganizerService {
    addEventOrganizer(eventOrganizer: IEventOrganizer): Promise<IEventOrganizer>;
    updateEventOrganizer(eventOrganizer: IEventOrganizer): Promise<IEventOrganizer>;
    showEventOrganizer(eventOrganizerId: String): Promise<IEventOrganizer>;
    listAllEventOrganizers(): Promise<IEventOrganizer[]>;
}
