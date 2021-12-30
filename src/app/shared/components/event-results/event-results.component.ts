import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEvent } from 'src/app/event/models/event.model';
import { EventSearcher as EventSearcherModel} from '../../models/event-searcher.model';
import { EventSearcherService } from '../../services/event-searcher.service';

@Component({
  selector: 'app-event-results',
  templateUrl: './event-results.component.html',
  styleUrls: ['./event-results.component.sass']
})
export class EventResultsComponent implements OnInit, OnDestroy {

  searchModel: EventSearcherModel = {} as EventSearcherModel;
  events: IEvent[] = [];
  actualPage: number = 1;
  subscription: Subscription;

  constructor(
    private messageService: EventSearcherService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetSearchModel();
    this.subscription = this.messageService.currentMessage.subscribe(message => this.searchModel = message);
  }

  resetSearchModel(): void {
    if (this.router.url.includes('results')) {
      Object.keys(this.searchModel).every(key => {
        if (this.searchModel[key].length > 0) {
          this.searchModel[key].length = 0;
        }
      })
      if (this.events.length > 0) {
        this.events.length = 0;
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
