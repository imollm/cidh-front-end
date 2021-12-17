import { Component, OnInit } from '@angular/core';
import { EventOrganizerService } from 'src/app/administration/services/event-organizer/event-organizer.service';

@Component({
  selector: 'app-event-organizer-list',
  templateUrl: './event-organizer-list.component.html',
  styleUrls: ['./event-organizer-list.component.sass']
})
export class EventOrganizerListComponent implements OnInit {

  constructor(
    private eventOrganizerService: EventOrganizerService
  ) { }

  ngOnInit(): void {
  }

}
