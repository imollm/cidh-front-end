import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndPointMapper } from 'src/app/helpers/endpoint-mapper.helper.service';
import { IForum } from '../models/forum.model';
import { IMessage } from '../models/message.model';
import { IForumService } from './forum.interface';

@Injectable({
  providedIn: 'root'
})
export class ForumService implements IForumService {

  private readonly resource = 'forum';

  constructor(
    private httpClient: HttpClient,
    private endpointMapper: EndPointMapper
  ) { }

  askQuestion(eventId: string, message: IMessage): Promise<void> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'post', eventId);
    return this.httpClient.post<void>(endpoint, message).toPromise();
  }

  answerQuestion(eventId: string, message: IMessage): Promise<void> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'post', eventId);
    return this.httpClient.post<void>(endpoint, message).toPromise();
  }

  getForum(eventId: string): Promise<IForum> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'get', eventId);
    return this.httpClient.get<IForum>(endpoint).toPromise();
  }
}
