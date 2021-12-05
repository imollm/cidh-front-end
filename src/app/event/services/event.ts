export interface IEventService {
  orderEvent(eventId: string, email: string, reservationId: string): void;
  listAllEvents(): void;
  findEventsByCategory(categoryId: string): void;
  findEventsByName(name: string): void;
  findEventsByLabel(label: string): void;
  findEvents(name: string, label: string): void;
  showEvent(eventId: string): void;
  findOrdersByUser(email: string): void;
  findAllOrders(): void;
  showOrder(orderId: string): void;
  showEventReserved(reservationId: string, location: URL): void;
}
