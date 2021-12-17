import { EventOrganizer } from "../../models/event-organizer.model";

export interface IEventOrganizerService {
    addEventOrganizer(eventOrganizer: EventOrganizer): void;
    updateEventOrganizer(eventOrganizer: EventOrganizer): void;
    showEventOrganizer(eventOrganizerId: String): EventOrganizer;
    listAllEventOrganizers(): EventOrganizer[];
}
