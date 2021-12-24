import { IEvent } from "src/app/event/models/event.model";
export interface IEventOrganizer { 
    id?: string;
    name: string;
    description: string;
    admin: string;
    createdAt?: number;
    managedEvents?: IEvent[];
}
