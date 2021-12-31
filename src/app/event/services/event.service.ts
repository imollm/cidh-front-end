import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEventService } from './event.interface';
import { IEvent } from '../models/event.model';
import { EventSearcher as EventSearcherModel } from 'src/app/shared/models/event-searcher.model';
import { EndPointMapper } from 'src/app/helpers/endpoint-mapper.helper.service';

@Injectable({
  providedIn: 'root'
})
export class EventService implements IEventService {

  constructor(
    private httpClient: HttpClient,
    private endpointMapper: EndPointMapper
  ) { }

  subscribe(eventId: string): Promise<void> {
    const endpoint = this.endpointMapper.getEndPointUrl('event', 'subscribe', eventId);
    return this.httpClient.post<void>(endpoint, {}).toPromise();
  }

  unsubscribe(eventId: string): Promise<void> {
    const endpoint = this.endpointMapper.getEndPointUrl('event', 'unsubscribe', eventId);
    return this.httpClient.post<void>(endpoint, {}).toPromise();
  }

  upcomingEvents(limit: string = '0'): Promise<IEvent[]> {
    let limitParam = `?limit=${limit}`;
    const endpoint = this.endpointMapper.getEndPointUrl('event', 'getEvents', limitParam);
    return this.httpClient.get<IEvent[]>(endpoint).toPromise();
  }

  findEvents(searchParams: EventSearcherModel): Promise<IEvent[]> {
    const endpoint = this.endpointMapper.getEndPointUrl('event', 'getEvents');
    const url = this.setSearchParams(endpoint, searchParams);
    return this.httpClient.get<IEvent[]>(url).toPromise();
  }

  findEventById(eventId: string): Promise<IEvent> {
    const endpoint = this.endpointMapper.getEndPointUrl('event', 'getEventById', eventId);
    return this.httpClient.get<IEvent>(endpoint).toPromise();
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

  private setSearchParams(endpoint, searchParams) {
    let url = new URL(endpoint);

    if (searchParams && (searchParams.category || searchParams.name || searchParams.label)) {
      Object.keys(searchParams).map(key => {
        if (searchParams[key].length > 0 && key !== 'events') {
          url.searchParams.append(key.toLocaleLowerCase(), searchParams[key].toString());
        }
      });
    }

    return url.toString();
  }
}
