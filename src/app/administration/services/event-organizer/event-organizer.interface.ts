import { EventOrganizer } from "../../models/event-organizer.model";

export interface IEventOrganizerService {
    addEventOrganizer(eventOrganizer: EventOrganizer): Promise<EventOrganizer>;
    updateEventOrganizer(eventOrganizer: EventOrganizer): Promise<EventOrganizer>;
    showEventOrganizer(eventOrganizerId: String): Promise<EventOrganizer>;
    listAllEventOrganizers(): Promise<EventOrganizer[]>;
}
