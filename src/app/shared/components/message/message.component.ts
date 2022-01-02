import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from 'src/app/event/models/event.model';
import { EventService } from 'src/app/event/services/event.service';
import { IForum } from 'src/app/media/models/forum.model';
import { IMessage } from 'src/app/media/models/message.model';
import { ForumService } from 'src/app/media/services/forum.service';
import { EventSearcher } from '../../models/event-searcher.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent implements OnInit {

  @Input() message: IMessage;
  @Input() eventName: string;
  event: IEvent;
  forum: IForum;
  answer: IMessage;

  constructor(
    private forumService: ForumService,
    private eventService: EventService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getEvent();
    await this.getForum();
    this.getMyAnswer();
  }

  private async getEvent(): Promise<void> {
    if (this.message && this.message.eventName) {
      let searchParams: EventSearcher = {
        name: [this.message.eventName]
      };
  
      this.eventService.findEvents(searchParams).then(res => {
        this.event = res[0];
      });
    }
  }

  private async getForum(): Promise<void> {
    if (this.event && this.event.id) {
      this.forumService.getForum(this.event.id).then(res => {
        this.forum = res;
      });
    }
  }

  private getMyAnswer(): void {
    if (this.forum && this.forum.messages && this.forum.messages.length > 0) {
      this.forum.messages.forEach(msg => {
        if (this.message.id === msg.parentMessageId) {
          this.answer = msg;
        }
      });
    }
  }
}
