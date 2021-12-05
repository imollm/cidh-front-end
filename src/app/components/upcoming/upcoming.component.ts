import { Component, OnInit } from '@angular/core';
import { Event } from '../../event/models/event.model';
import * as faker from 'faker';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.sass']
})
export class UpcomingComponent implements OnInit {

  upcomingEvents: Event[] = [];

  constructor() {
    this.initEvents();
  }

  ngOnInit(): void {
  }

  private initEvents(): void {
    let event = {} as Event;
    for (let i = 0; i < 4; i++) {
      event.name = faker.name.title();
      event.description = faker.commerce.productDescription();
      event.picture = faker.image.imageUrl();
      event.rating = faker.datatype.number();
      event.location = faker.internet.url();
      event.initDate = faker.datatype.datetime();
      event.endDate = faker.datatype.datetime();
      this.upcomingEvents.push(event);
      event = {} as Event;
    }
  }

}
