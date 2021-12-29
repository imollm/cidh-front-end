import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Label } from 'src/app/administration/models/label.model';
import { EventService } from 'src/app/event/services/event.service';
import { EventSearcher } from 'src/app/shared/models/event-searcher.model';
import { EventSearcherService } from 'src/app/shared/services/event-searcher.service';

@Component({
  selector: 'app-lab-card',
  templateUrl: './lab-card.component.html',
  styleUrls: ['./lab-card.component.sass']
})
export class LabCardComponent implements OnInit, OnDestroy {

  @Input() label: Label;
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
      this.searchParams.label = [];
      this.searchParams.label.push(this.label.name);
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
    this.messageService.changeMessage(this.searchParams)
  }

  ngOnDestroy(): void { 
    this.subscription.unsubscribe();
  }

}
