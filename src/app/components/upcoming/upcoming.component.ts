import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/event/services/event.service';
import { Event } from '../../event/models/event.model';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.sass']
})
export class UpcomingComponent implements OnInit {

  upcomingEvents: Event[] = [];
  lastEvents: string = '10';

  constructor(private eventService: EventService) 
  { }

  ngOnInit(): void {
    this.initEvents();
  }

  private initEvents(): void {
    this.eventService.upcomingEvents(this.lastEvents).then(res => {
      if (res && res.length > 0) {
        this.upcomingEvents = res;
      }
    }).catch(err => console.log(err));
  }

}
