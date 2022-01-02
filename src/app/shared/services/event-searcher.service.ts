import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventSearcher as EventSearcherModel} from '../models/event-searcher.model';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to communicate between
 * (Origin) CatCardComponent, LabCardComponent, EventDetail
 * (Destination) EventSearcherComponent
 *
 * @class EventSearcherService
*/
export class EventSearcherService {

  private message: EventSearcherModel = {} as EventSearcherModel;
  private messageSource = new BehaviorSubject<EventSearcherModel>(this.message);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: EventSearcherModel) {
    this.messageSource.next(message);
  }

  deleteMessage(): void {
    this.message.category && this.message.category.length > 0
      ? this.message.category.length = 0 : null;
    this.message.label && this.message.label.length > 0 
      ? this.message.label.length = 0 : null
    this.message.name && this.message.name.length > 0 
      ? this.message.name.length = 0 : null
    this.message.events && this.message.events.length > 0 
      ? this.message.events.length = 0 : null
    this.message.redirect = false;
  }
  
}
