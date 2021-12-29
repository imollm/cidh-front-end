import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEvent } from 'src/app/event/models/event.model';
import { EndPointMapper } from 'src/app/helpers/endpoint-mapper.helper.service';
import { IFavoriteService } from './favorite.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService implements IFavoriteService {

  private readonly resource = 'favorite';

  constructor(
    private httpClient: HttpClient,
    private endpointMapper: EndPointMapper
  ) { }
  
  addToFavorites(eventId: string): Promise<void> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'add', eventId);
    return this.httpClient.post<void>(endpoint, {}).toPromise();
  }

  removeToFavorties(eventId: string): Promise<void> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'remove', eventId);
    return this.httpClient.post<void>(endpoint, {}).toPromise();
  }

  listAllFavoritesByUserId(): Promise<IEvent[]> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'listByUserId');
    return this.httpClient.get<IEvent[]>(endpoint).toPromise();
  }

  listAllMyFavorites(): Promise<IEvent[]> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'listMyFavs');
    return this.httpClient.get<IEvent[]>(endpoint).toPromise();
  }
}
