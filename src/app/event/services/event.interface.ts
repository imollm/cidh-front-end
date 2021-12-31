import { EventSearcher as EventSearcherModel } from "src/app/shared/models/event-searcher.model";
import { IEvent } from "../models/event.model";

export interface IEventService {
  subscribe(eventId: string): Promise<void>;
  unsubscribe(eventId: string): Promise<void>;
  findEvents(searchParams: EventSearcherModel): Promise<IEvent[]>;
  findEventById(eventId: string): Promise<IEvent>;
  showEvent(eventId: string): void;
  findOrdersByUser(email: string): void;
  findAllOrders(): void;
  showOrder(orderId: string): void;
  accessToEvent(reservationId: string, location: URL): void;
  upcomingEvents(limit: string): Promise<IEvent[]>
}
