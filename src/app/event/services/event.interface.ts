import { EventSearcher as EventSearcherModel } from "src/app/shared/models/event-searcher.model";
import { IEvent } from "../models/event.model";

export interface IEventService {
  orderEvent(eventId: string, email: string, reservationId: string): void;
  findEvents(searchParams: EventSearcherModel): Promise<IEvent[]>;
  showEvent(eventId: string): void;
  findOrdersByUser(email: string): void;
  findAllOrders(): void;
  showOrder(orderId: string): void;
  showEventReserved(reservationId: string, location: URL): void;
  upcomingEvents(limit: string): Promise<IEvent[]>
}
