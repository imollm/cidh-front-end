import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEventService } from './event.interface';
import { Event } from '../models/event.model';
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

  orderEvent(eventId: string, email: string, reservationId: string): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }

  upcomingEvents(limit: string = '0'): Promise<Event[]> {
    let limitParam = `?limit=${limit}`;
    const endpoint = this.endpointMapper.getEndPointUrl('event', 'getEvents', limitParam);
    return this.httpClient.get<Event[]>(endpoint).toPromise();
  }

  findEvents(searchParams: EventSearcherModel): Promise<Event[]> {
    const query = this.setSearchParams(searchParams);
    const endpoint = this.endpointMapper.getEndPointUrl('event', 'getEvents', query);
    return this.httpClient.get<Event[]>(endpoint).toPromise();
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

  private setSearchParams(searchParams: EventSearcherModel): string {
    let params = '';

    if (searchParams && (searchParams.category || searchParams.label || searchParams.name)) {
      let flag = false;
      params += '?';

      Object.keys(searchParams).every((key) => {
        if (searchParams[key].isArray() && searchParams[key] > 0) {
          let param = searchParams[key];
          
          if (flag) {
            params += `&${key}=`;
          }

          // Here iterate over Category:obj[]/Label:obj[]/name:string[]
          param.forEach((obj: any) => {
            if (typeof obj === 'object') {
              params += `${obj.name},`;
            } else if (typeof obj === 'string') {
              params += `${obj},`;
            }
          });

          flag = true;
        }
      });
    }

    return params;
  }
}
