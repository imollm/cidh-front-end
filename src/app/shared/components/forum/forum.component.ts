import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from 'src/app/event/models/event.model';
import { EventService } from 'src/app/event/services/event.service';
import { ModalResultService } from 'src/app/helpers/modal.service';
import { UtilsService } from 'src/app/helpers/utils.helper.service';
import { IForum } from 'src/app/media/models/forum.model';
import { IMessage } from 'src/app/media/models/message.model';
import { AuthService } from 'src/app/profile/services/auth/auth.service';
import Swal from 'sweetalert2';
import { ForumService } from '../../../media/services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.sass']
})
export class ForumComponent implements OnInit {

  private eventId: string;
  private message: string;
  eventName: string;
  actualPage: number = 1;
  forum: IForum = {} as IForum;
  events: IEvent[];

  constructor(
    private forumService: ForumService,
    private eventService: EventService,
    private router: Router,
    private authService: AuthService,
    private modalResultService: ModalResultService
  ) { }

  async ngOnInit(): Promise<void> {
    this.borderStyle();
    await this.getEvents();
    await this.getForum();
  }

  private async getEvents(): Promise<void> {
    this.events = await this.eventService.getAllEvents();
  }

  private getForum(): void {
    const site = this.router.url;

    if (site.includes('event/view') || site.includes('event-detail')) {
      this.eventId = UtilsService.getResourceIdFromURI(this.router.url);
      this.getEventForum();
    } else if (site.includes('media/forum') || site.includes('media/dashboard/forum')) {
      this.getAllForums();
    }
  }

  private async getEventForum(): Promise<void> {
    this.forum = await this.forumService.getForum(this.eventId);
    this.eventName = this.forum.eventName;
  }

  private async getAllForums(): Promise<void> {
    let currentForum: IForum;
    this.forum.messages = [];

    this.events.forEach(async event => {
      currentForum = await this.forumService.getForum(event.id);

      if (currentForum.messages.length > 0) {
        currentForum.messages.forEach(msg => {
          msg.eventName = currentForum.eventName;
          this.forum.messages.push(msg);
        });
      }
    });
  }

  addQuestion(): void {
    Swal.fire({
      title: 'Selecciona un event',
      input: 'select',
      inputOptions: this.setSelectOfEvents(),
      inputPlaceholder: 'Selecciona un event',
      showCancelButton: true,
      confirmButtonColor: '#00adb5',
      cancelButtonColor: '#8ea8c3',
      inputValidator: (eventId) => {
        if (!eventId) {
          return 'Necessites escollir un event';
        } else {
          this.eventId = eventId;
          return null;
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Escriu el teu missatge',
          input: 'textarea',
          inputPlaceholder: 'Quin missatge es el teu...',
          showCancelButton: true,
          confirmButtonColor: '#00adb5',
          cancelButtonColor: '#8ea8c3',
          inputValidator: (message) => {
            if (!message) {
              return 'Necessites escriure un missatge vàlid!';
            } else {
              this.message = message;
              return null;
            }
          }
        }).then((result) => {
          if (result.isConfirmed) {
            if (this.eventId && this.message && this.canThisUserMakeAQuestion()) {
              let newMessage: IMessage = {
                message: this.message,
                createdAt: UtilsService.convertDateToEpoch(UtilsService.getFullDate(new Date())),
                parentMessageId: null
              };

              this.forumService.askQuestion(this.eventId, newMessage).then(() => {
                this.modalResultService.successPostComment();
              })
              .then(() => this.ngOnInit())
              .catch(err => {
                if (err) {
                  this.modalResultService.errorResultModal();
                }
              })
            }
          }
        });
      }
    });
  }

  canThisUserMakeAQuestion(): boolean {
    const role = UtilsService.getRoleFromAccessToken();
    return role === null || role === 'USER';
  }

  private borderStyle(): void {
    const url: string = this.router.url;

    if (url.includes('media/dashboard/forum') || url.includes('event/view') || url.includes('/event-detail/')) {
      (document.querySelector('section.forum') as HTMLElement).style.borderRadius = '25px';
    }
  }

  isDashboard(): boolean {
    return this.authService.isLogged();
  }

  isEventDetail(): boolean {
    const url: string = this.router.url;
    return url.includes('event/view') || url.includes('event-detail');
  }

  private setSelectOfEvents(): object {
    let eventsObj = {};

    if (this.isEventDetail()) {
      this.events.forEach(event => {
        if (event.id === this.eventId) {
          eventsObj[event.id] = event.name;
        }
      })
    } else {
      this.events.forEach(event => {
        eventsObj[event.id] = event.name;
      })
    }

    return eventsObj;
  }

}
