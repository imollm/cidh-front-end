import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/administration/models/category.model';
import { EventService } from 'src/app/event/services/event.service';
import { EventSearcher } from 'src/app/shared/models/event-searcher.model';
import { EventSearcherService } from 'src/app/shared/services/event-searcher.service';

@Component({
  selector: 'app-cat-card',
  templateUrl: './cat-card.component.html',
  styleUrls: ['./cat-card.component.sass']
})
export class CatCardComponent {

  @Input() category: Category;

  constructor(
    private router: Router,
    private messageService: EventSearcherService,
    private eventService: EventService
  ) { }

  goToResultsPage(): void {
    this.router.navigate(['/results']).then(() => {
      let searchParams: EventSearcher = {} as EventSearcher;
      searchParams.category.push(this.category);
      this.eventService.findEvents(searchParams).then(res => {
        searchParams.events = res;
      }).then(() => {
        this.messageService.changeMessage(searchParams);
      });
    });
  }
}
