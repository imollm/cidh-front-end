import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEventService } from './event.interface';
import * as faker from 'faker';
import { Event } from '../models/event.model';
import { EventSearcher as EventSearcherModel } from 'src/app/shared/models/event-searcher.model';

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
  findEventsByCategory(categoryId: string): Event[] {
    TODO: 'Method not implemented.'
    let events: Event[] = [];
    for (let i = 0; i < 10; i++) {
      events.push({
        name: faker.lorem.word(),
        description: faker.lorem.word(),
        picture: faker.image.imageUrl(),
        rating: faker.datatype.number(),
        location: faker.address.streetAddress(),
        initDate: faker.date.soon(),
        endDate: faker.date.future()
      });
    }
    return events;
  }
  findEventsByName(name: string): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
  findEventsByLabel(label: string): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
  findEvents(searchParams: EventSearcherModel): Event[] {
    TODO: 'Method not implemented.'
    let events: Event[] = [];
    for (let i = 0; i < 10; i++) {
      events.push({
        name: faker.lorem.word(),
        description: faker.lorem.word(),
        picture: faker.image.imageUrl(),
        rating: faker.datatype.number(),
        location: faker.address.streetAddress(),
        initDate: faker.date.soon(),
        endDate: faker.date.future()
      });
    }
    return events;
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
