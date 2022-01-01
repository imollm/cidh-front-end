import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from 'src/app/media/models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent implements OnInit {

  @Input() message: IMessage;

  constructor() { }

  ngOnInit(): void {
  }

}
