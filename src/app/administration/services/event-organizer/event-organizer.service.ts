import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndPointMapper } from 'src/app/helpers/endpoint-mapper.helper.service';
import { IEventOrganizer } from '../../models/event-organizer.model';
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

  addEventOrganizer(eventOrganizer: IEventOrganizer): Promise<IEventOrganizer> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'create');
    return this.httpClient.post<IEventOrganizer>(endpoint, eventOrganizer).toPromise();
  }

  updateEventOrganizer(eventOrganizerId: string, eventOrganizer: IEventOrganizer): Promise<IEventOrganizer> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'updateById', eventOrganizerId);
    return this.httpClient.post<IEventOrganizer>(endpoint, eventOrganizer).toPromise();
  }

  showEventOrganizer(eventOrganizerId: string): Promise<IEventOrganizer> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'getById', eventOrganizerId);
    return this.httpClient.get<IEventOrganizer>(endpoint).toPromise();
  }

  listAllEventOrganizers(): Promise<IEventOrganizer[]> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'getAll');
    return this.httpClient.get<IEventOrganizer[]>(endpoint).toPromise();
  }
}
