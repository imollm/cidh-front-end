import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEvent } from 'src/app/event/models/event.model';
import { EndPointMapper } from 'src/app/helpers/endpoint-mapper.helper.service';
import { IFavouriteService } from './favourite.interface';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService implements IFavouriteService {

  constructor(
    private httpClient: HttpClient,
    private endpointMapper: EndPointMapper
  ) { }
  
  addToFavourites(eventId: string): Promise<void> {
    const endpoint = this.endpointMapper.getEndPointUrl('favourite', 'add', eventId);
    return this.httpClient.post<void>(endpoint, {}).toPromise();
  }

  removeToFavourties(eventId: string): Promise<void> {
    const endpoint = this.endpointMapper.getEndPointUrl('favourite', 'remove', eventId);
    return this.httpClient.post<void>(endpoint, {}).toPromise();
  }

  listAllFavouritesByUserId(): Promise<IEvent[]> {
    const endpoint = this.endpointMapper.getEndPointUrl('favourite', 'listByUserId');
    return this.httpClient.get<IEvent[]>(endpoint).toPromise();
  }

  listAllMyFavourites(): Promise<IEvent[]> {
    const endpoint = this.endpointMapper.getEndPointUrl('favourite', 'listMyFavs');
    return this.httpClient.get<IEvent[]>(endpoint).toPromise();
  }
}
