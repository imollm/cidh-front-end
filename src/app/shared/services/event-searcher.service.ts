import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventSearcher as EventSearcherModel} from '../models/event-searcher.model';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to communicate between
 * (Parent) EventSearcherComponent
 * (Sibling) EventResultsComponent
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
}
