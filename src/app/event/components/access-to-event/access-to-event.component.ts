import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { ModalResultService } from 'src/app/helpers/modal.service';
import { UtilsService } from 'src/app/helpers/utils.helper.service';
import { IEvent } from '../../models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-access-to-event',
  templateUrl: './access-to-event.component.html',
  styleUrls: ['./access-to-event.component.sass']
})
export class AccessToEventComponent implements OnInit {

  event: IEvent;
  faBackToDetail = faArrowCircleLeft;

  constructor(
    private eventService: EventService,
    private router: Router,
    private modalResultService: ModalResultService
  ) { }

  ngOnInit(): void {
    this.getEvent();
  }

  private getEvent(): void {
    const url: string = this.router.url;
    const eventId: string = UtilsService.getResourceIdFromURI(url);

    this.eventService.findEventById(eventId).then(res => {
      if (!res) {
        this.router.navigate(['/profile/dashboard/home']).then(() => {
          this.modalResultService.errorResultModal();
        });
      } else {
        this.event = res;
        console.log(eventId);
        console.log(this.event);
      }
    }).catch(err => {
      if (err) {
        this.router.navigate(['/profile/dashboard/home']).then(() => {
          this.modalResultService.errorResultModal();
        });
      }
    });
  }
}
