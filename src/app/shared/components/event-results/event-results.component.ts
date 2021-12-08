import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/event/models/event.model';
import { EventSearcher as EventSearcherModel} from '../../models/event-searcher.model';
import { EventSearcherService } from '../../services/event-searcher.service';

@Component({
  selector: 'app-event-results',
  templateUrl: './event-results.component.html',
  styleUrls: ['./event-results.component.sass']
})
export class EventResultsComponent implements OnInit {

  searchModel: EventSearcherModel | undefined;
  events: Event[] = [];
  actualPage: number = 1;

  constructor(
    private messageService: EventSearcherService,
  ) { }

  ngOnInit(): void {
    this.messageService.currentMessage.subscribe(data => {
      this.searchModel = data;
    });
  }
}
