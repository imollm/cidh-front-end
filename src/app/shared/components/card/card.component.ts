import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/event/models/event';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {

  @Input() event = {} as Event;

  constructor() { }

  ngOnInit(): void {
  }

}
