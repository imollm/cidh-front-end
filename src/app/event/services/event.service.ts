import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEventService } from './event.interface';
import { IEvent } from '../models/event.model';
import { EventSearcher as EventSearcherModel } from 'src/app/shared/models/event-searcher.model';
import { EndPointMapper } from 'src/app/helpers/endpoint-mapper.helper.service';
import { IForum } from '../../media/models/forum.model';

@Injectable({
  providedIn: 'root',
})
export class EventService implements IEventService {
  constructor(
    private httpClient: HttpClient,
    private endpointMapper: EndPointMapper
  ) {}

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

  getAllEvents(): Promise<IEvent[]> {
    const endpoint = this.endpointMapper.getEndPointUrl('event', 'getEvents');
    return this.httpClient.get<IEvent[]>(endpoint).toPromise();
  }

  findSubscriptionsByUser(userId: string): Promise<IEvent[]> {
    const endpoint = this.endpointMapper.getEndPointUrl('event', 'getEventsByUser', userId);
    return this.httpClient.get<IEvent[]>(endpoint).toPromise();
  }

  findSubscriptionsByAdmin(adminId: string): Promise<IEvent[]> {
    const endpoint = this.endpointMapper.getEndPointUrl('event', 'getEventsByAdmin', adminId);
    return this.httpClient.get<IEvent[]>(endpoint).toPromise();
  }

  getAllComments(eventId: string): Promise<[]> {
    const endpoint = this.endpointMapper.getEndPointUrl('event', 'getAllComments', eventId);
    return this.httpClient.get<[]>(endpoint).toPromise();
  }

  getForumByEvent(eventId: string): Promise<IForum> {
    const endpoint = this.endpointMapper.getEndPointUrl('event', 'getForumId', eventId);
    return this.httpClient.get<IForum>(endpoint).toPromise();
  }

  private setSearchParams(endpoint, searchParams) {
    let url = new URL(endpoint);

    if (
      searchParams &&
      (searchParams.category || searchParams.name || searchParams.label)
    ) {
      Object.keys(searchParams).map((key) => {
        if (searchParams[key].length > 0 && key !== 'events') {
          url.searchParams.append(
            key.toLocaleLowerCase(),
            searchParams[key].toString()
          );
        }
      });
    }

    return url.toString();
  }
}
