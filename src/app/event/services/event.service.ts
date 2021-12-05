import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEventService } from './event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService implements IEventService {

  constructor(private httpClient: HttpClient) {
  }
  orderEvent(eventId: string, email: string, reservationId: string): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
  listAllEvents(): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
  findEventsByCategory(categoryId: string): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
  findEventsByName(name: string): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
  findEventsByLabel(label: string): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
  findEvents(name: string, label: string): void {
  }
  showEvent(eventId: string): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
  findOrdersByUser(email: string): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
  findAllOrders(): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
  showOrder(orderId: string): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
  showEventReserved(reservationId: string, location: URL): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
}
