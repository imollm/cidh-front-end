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

  addEventOrganizer(eventOrganizer: EventOrganizer): void {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'create');
  }
  updateEventOrganizer(eventOrganizer: EventOrganizer): void {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'updateById');
  }
  showEventOrganizer(eventOrganizerId: String): EventOrganizer {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'getById');
  }
  listAllEventOrganizers(): EventOrganizer[] {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'getAll');
  }
}
