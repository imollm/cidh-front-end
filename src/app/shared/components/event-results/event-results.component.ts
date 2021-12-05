import { Component, OnInit } from '@angular/core';
import { EventSearcher as EventSearcherModel} from '../../models/event-searcher.model';
import { EventSearcherService } from '../../services/event-searcher.service';

@Component({
  selector: 'app-event-results',
  templateUrl: './event-results.component.html',
  styleUrls: ['./event-results.component.sass']
})
export class EventResultsComponent implements OnInit {

  searchParams: EventSearcherModel;

  constructor(
    private messageService: EventSearcherService,
  ) { }

  ngOnInit(): void {
    this.messageService.currentMessage.subscribe(params => {
      this.searchParams = params;
    });
  }
}
