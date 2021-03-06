import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/event/services/event.service';
import { IEvent } from '../../event/models/event.model';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.sass']
})
export class UpcomingComponent implements OnInit {

  upcomingEvents: IEvent[] = [];
  lastEvents: string = '10';
  actualPage: number = 1;

  constructor(private eventService: EventService) 
  { }

  ngOnInit(): void {
    this.getEvents();
  }

  private getEvents(): void {
    this.eventService.upcomingEvents(this.lastEvents).then(res => {
      if (res && res.length > 0) {
        this.upcomingEvents = res;
      }
    }).catch(err => console.log(err));
  }

}
