import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/administration/models/category.model';
import { EventService } from 'src/app/event/services/event.service';
import { EventSearcher } from 'src/app/shared/models/event-searcher.model';
import { EventSearcherService } from 'src/app/shared/services/event-searcher.service';

@Component({
  selector: 'app-cat-card',
  templateUrl: './cat-card.component.html',
  styleUrls: ['./cat-card.component.sass']
})
export class CatCardComponent implements OnInit, OnDestroy {

  @Input() category: Category;
  subscription: Subscription;
  searchParams: EventSearcher = {} as EventSearcher;

  constructor(
    private router: Router,
    private messageService: EventSearcherService,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.subscription = this.messageService.currentMessage.subscribe(message => this.searchParams = message);
    this.messageService.deleteMessage();
  }

  goToResultsPage(): void {
    this.router.navigate(['/search']).then(() => {
      this.searchParams.category = [];
      this.searchParams.category.push(this.category.name);
      this.eventService.findEvents(this.searchParams).then(res => {
        if (res) {
          this.searchParams.events = res;
        }
      }).then(() => {
        this.sendSearchParams();
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }

  sendSearchParams(): void {
    this.messageService.changeMessage(this.searchParams);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
