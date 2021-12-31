import { Injectable } from '@angular/core';
import { EndPointMapper } from 'src/app/helpers/endpoint-mapper.helper.service';
import { HttpClient } from '@angular/common/http';
import { IEvent } from 'src/app/event/models/event.model';
import { IEventProfileService } from './eventProfile.interface';


@Injectable({
  providedIn: 'root'
})
export class EventProfileService implements IEventProfileService{

  private readonly resource: string = 'event';

  constructor(
    private httpClient: HttpClient,
    private endpointMapper: EndPointMapper
  ) { }

  addEvent(event: IEvent): Promise<IEvent> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'create');
    return this.httpClient.post<IEvent>(endpoint, event).toPromise();
  }

  updateEvent(eventId: string, event: IEvent): Promise<IEvent> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'updateById', eventId);
    return this.httpClient.post<IEvent>(endpoint, event).toPromise();
  }

  showEvent(eventId: string): Promise<IEvent> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'getEventById', eventId);
    return this.httpClient.get<IEvent>(endpoint).toPromise();
  }

  listAllEvents(): Promise<IEvent[]> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'getEvents')
    return this.httpClient.get<IEvent[]>(endpoint).toPromise();
  }

}
