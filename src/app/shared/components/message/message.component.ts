import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEvent } from 'src/app/event/models/event.model';
import { EventService } from 'src/app/event/services/event.service';
import { ModalResultIcon } from 'src/app/helpers/modal.icon.enum';
import { ModalResultService } from 'src/app/helpers/modal.service';
import { UtilsService } from 'src/app/helpers/utils.helper.service';
import { IForum } from 'src/app/media/models/forum.model';
import { IMessage } from 'src/app/media/models/message.model';
import { ForumService } from 'src/app/media/services/forum.service';
import { AuthService } from 'src/app/profile/services/auth/auth.service';
import Swal from 'sweetalert2';
import { EventSearcher } from '../../models/event-searcher.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent implements OnInit {

  @Input() message: IMessage;
  @Input() eventName: string;
  @Output() messageAnswered = new EventEmitter<boolean>();

  event: IEvent;
  forum: IForum;
  answer: IMessage = null;
  response: IMessage = {} as IMessage;

  constructor(
    private forumService: ForumService,
    private eventService: EventService,
    private authService: AuthService,
    private modalResultModal: ModalResultService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getEvent();
    await this.getForum();
    await this.getMyAnswer();
  }

  private async getEvent(): Promise<void> {
    if (this.message && this.message.eventName) {
      let searchParams: EventSearcher = {
        name: [this.message.eventName]
      };

      const response = await this.eventService.findEvents(searchParams);
      this.event = response[0];
    }
  }

  private async getForum(): Promise<void> {
    if (this.event) {
      this.forum = await this.forumService.getForum(this.event.id);
    }
  }

  private async getMyAnswer(): Promise<void> {
    if (this.message.parentMessageId === null && this.forum && this.forum.messages && this.forum.messages.length > 0) {
      this.forum.messages.forEach(msg => {
        if (this.message.id === msg.parentMessageId) {
          this.answer = msg;
        }
      });
    }
  }

  canBeAnswered(): boolean {
    if (!this.answer) {
      const isAdmin = this.authService.getRoleOfAuthUser() === 'ADMIN';
      const isSuperAdmin = this.authService.getRoleOfAuthUser() === 'SUPERADMIN';
      const isLogged = this.authService.isLogged();

      return (isAdmin || isSuperAdmin) && isLogged;
    }

    return false;
  }

  answerQuestion(): void {
    Swal.fire({
      title: 'Escriu una resposta',
      input: 'textarea',
      inputPlaceholder: 'Resposta...',
      showCancelButton: true,
      confirmButtonColor: '#00adb5',
      cancelButtonColor: '#8ea8c3',
      inputValidator: (msg) => {
        if (!msg) {
          return 'Escriu una resposta vàlida';
        } else {
          this.response.message = msg;
          return null;
        }
      }
    }).then(result => {
      if (result.isConfirmed) {
        this.response.parentMessageId = this.message.id;
        this.response.createdAt = UtilsService.convertDateToEpoch(UtilsService.getFullDate(new Date()))

        this.forumService.answerQuestion(this.event.id, this.response).then(() => {
          const title = 'Missatge enviat correctament';
          const text = 'S\'ha enviat, gràcies per la teva col·laboració';
          const icon: ModalResultIcon = ModalResultIcon.success;

          this.modalResultModal.showModal(title, text, icon);

          this.messageAnswered.emit(true);
        }).catch(err => {
          if (err) {
            this.modalResultModal.errorResultModal();
          }
        });
      }
    });
  }
}
