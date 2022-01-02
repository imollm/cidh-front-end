import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from 'src/app/event/models/event.model';
import { EventService } from 'src/app/event/services/event.service';
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
  actualPage: number = 1;
  forum: IForum = {} as IForum;
  events: IEvent[];
  eventName: string;

  @ViewChild('forumContainer') forumContainer: ElementRef;

  constructor(
    private forumService: ForumService,
    private eventService: EventService,
    private router: Router,
    private er: ElementRef,
    private authService: AuthService
  ) {
    this.forumContainer = this.er;
  }

  async ngOnInit(): Promise<void> {
    this.eventId = UtilsService.getResourceIdFromURI(this.router.url);
    this.borderStyle();
    await this.getEvents();
    await this.getForum();
  }
  
  private async getEvents(): Promise<void> {
    this.events = await this.eventService.getAllEvents();
  }

  private getForum(): void {
    const site = this.router.url;

    if (site.includes('event/view')) {
      this.getEventForum();
    } else if (site.includes('media/forum') || site.includes('media/dashboard/forum')) {
      this.getAllForums();
    }
  }

  private async getEventForum(): Promise<void> {
    this.forum = await this.forumService.getForum(this.eventId);
  }

  private async getAllForums(): Promise<void> {
    let currentForum: IForum;
    this.forum.messages = [];

    this.events.forEach(async event => {
      currentForum = await this.forumService.getForum(event.id);
      this.eventName = currentForum.eventName;
      
      if (currentForum.messages.length > 0) {
        currentForum.messages.forEach(msg => {
          this.forum.messages.push(msg);
        });
      }
    });
  }

  addQuestion(): void {
    Swal.fire({
      title: 'Selecciona un event',
      input: 'select',
      inputOptions: {
        event1: 'Event 1',
        event2: 'Event 2',
        event3: 'Event 3',
      },
      inputPlaceholder: 'Selecciona un event',
      showCancelButton: true,
      confirmButtonColor: '#00adb5',
      cancelButtonColor: '#8ea8c3',
      inputValidator: (eventId) => {
        if (!eventId) {
          return 'Necessites escollir un event';
        } else {
          this.eventId = eventId;
          console.log(this.eventId);
          return null;
        }
      }
    }).then(() => {
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
      })
    }).then(() => {
      //TODO: Make a addQuestion HTTP Request if user is not ADMIN or SUPERADMIN
    });
  }

  canThisUserMakeAQuestion(): boolean {
    const role = UtilsService.getRoleFromAccessToken();
    return role !== 'ADMIN' && role !== 'SUPERADMIN';
  }

  borderStyle(): void {
    if (this.router.url.includes('event-detail')) {
      this.forumContainer.nativeElement.style.borderRadius = '25px';
    }
  }

  isDashboard(): boolean {
    return this.authService.isLogged();
  }

  isEventDetail(): boolean {
    return this.router.url.includes('event/view');
  }

}
