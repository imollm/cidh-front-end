import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/event/models/event.model';
import { EventService } from 'src/app/event/services/event.service';
import { EventSearcher as EventSearcherModel} from '../../models/event-searcher.model';
import { EventSearcherService } from '../../services/event-searcher.service';

@Component({
  selector: 'app-event-results',
  templateUrl: './event-results.component.html',
  styleUrls: ['./event-results.component.sass']
})
export class EventResultsComponent implements OnInit {

  searchParams: EventSearcherModel;
  events: Event[] = [];
  actualPage: number = 1;

  constructor(
    private messageService: EventSearcherService,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.messageService.currentMessage.subscribe(params => {
      this.searchParams = params;
    });
    this.events = this.eventService.findEvents(this.searchParams);
  }
}
