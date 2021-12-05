import { EventSearcher as EventSearcherModel } from "src/app/shared/models/event-searcher.model";
import { Event } from "../models/event.model";

export interface IEventService {
  orderEvent(eventId: string, email: string, reservationId: string): void;
  listAllEvents(): void;
  findEventsByCategory(categoryId: string): void;
  findEventsByName(name: string): void;
  findEventsByLabel(label: string): void;
  findEvents(searchParams: EventSearcherModel): Event[];
  showEvent(eventId: string): void;
  findOrdersByUser(email: string): void;
  findAllOrders(): void;
  showOrder(orderId: string): void;
  showEventReserved(reservationId: string, location: URL): void;
}
