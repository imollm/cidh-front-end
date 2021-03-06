import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from 'src/app/event/models/event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.sass']
})
export class EventCardComponent implements OnInit {

  @Input() event: IEvent;
  today: Date;
  eventRoute: string;

  constructor(
    private router: Router
  ) {
    this.today = new Date();
  }
  ngOnInit(): void {
    if (this.router.url.includes('dashboard')) {
      this.eventRoute = '/event/dashboard/event/view';
    } else {
      this.eventRoute = '/event-detail';
    }
  }

  isCelebrated(): boolean {
    let eventEndDate: any = this.event.endDate;
    return new Date(eventEndDate * 1000) > this.today;
  }

}
