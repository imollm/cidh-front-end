import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/event/models/event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.sass']
})
export class EventCardComponent implements OnInit {

  @Input() event = {} as Event;

  constructor() { }

  ngOnInit(): void {
  }

}
