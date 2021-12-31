import { IEvent } from 'src/app/event/models/event.model';


export interface IEventProfileService {


  addEvent(event: IEvent): Promise<IEvent>
  updateEvent(eventId: string, event: IEvent): Promise<IEvent>
  showEvent(eventId: string): Promise<IEvent>
  listAllEvents(): Promise<IEvent[]>

}