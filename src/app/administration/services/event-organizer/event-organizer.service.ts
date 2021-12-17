import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndPointMapper } from 'src/app/helpers/endpoint-mapper.helper.service';
import { EventOrganizer } from '../../models/event-organizer.model';
import { IEventOrganizerService } from './event-organizer.interface';

@Injectable({
  providedIn: 'root'
})
export class EventOrganizerService implements IEventOrganizerService {

  private readonly resource: string = 'event-organizer';

  constructor(
    private httpClient: HttpClient,
    private endpointMapper: EndPointMapper
  ) { }

  addEventOrganizer(eventOrganizer: EventOrganizer): Promise<EventOrganizer> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'create');
    return this.httpClient.post<EventOrganizer>(endpoint, eventOrganizer).toPromise();
  }

  updateEventOrganizer(eventOrganizer: EventOrganizer): Promise<EventOrganizer> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'updateById', eventOrganizer.id);
    return this.httpClient.put<EventOrganizer>(endpoint, eventOrganizer).toPromise();
  }

  showEventOrganizer(eventOrganizerId: string): Promise<EventOrganizer> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'getById', eventOrganizerId);
    return this.httpClient.get<EventOrganizer>(endpoint).toPromise();
  }

  listAllEventOrganizers(): Promise<EventOrganizer[]> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'getAll');
    return this.httpClient.get<EventOrganizer[]>(endpoint).toPromise();
  }
}
