import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndPointMapper } from 'src/app/helpers/endpoint-mapper.helper.service';
import { IComment } from '../models/comment.model';
import { ICommentService } from './comment.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService implements ICommentService {

  private readonly resource = 'comment';

  constructor(
    private httpClient: HttpClient,
    private endpointMapper: EndPointMapper
  ) { }

  sendComment(eventId: string, comment: IComment): Promise<void> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'post', eventId);
    return this.httpClient.post<void>(endpoint, comment).toPromise();
  }

  addRating(eventId: string, rating: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getCommentsByEventId(eventId: string): Promise<IComment[]> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'getAll', eventId);
    return this.httpClient.get<IComment[]>(endpoint).toPromise();
  }
}
