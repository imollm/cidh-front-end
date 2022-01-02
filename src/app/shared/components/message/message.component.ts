import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IMessage } from 'src/app/media/models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent {

  @Input() message: IMessage;
  @Input() eventName: string;

  constructor() { }

}
