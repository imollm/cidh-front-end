import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEventOrganizer } from 'src/app/administration/models/event-organizer.model';
import { EventOrganizerService } from 'src/app/administration/services/event-organizer/event-organizer.service';
import { UtilsService } from 'src/app/helpers/utils.helper.service';

@Component({
  selector: 'app-event-organizer-detail',
  templateUrl: './event-organizer-detail.component.html',
  styleUrls: ['./event-organizer-detail.component.sass']
})
export class EventOrganizerDetailComponent implements OnInit {

  title: string = "Detalls de l'empresa";
  eventOrganizer: IEventOrganizer = {} as IEventOrganizer;

  constructor(
    private eventOrganizerService: EventOrganizerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.eventOrganizer.id = UtilsService.getResourceIdFromURI(this.router.url);
    this.getEventOrganizer();
  }

  getEventOrganizer(): void {
    this.eventOrganizerService.showEventOrganizer(this.eventOrganizer.id).then(res => {
      if (res.length > 0) {
        this.eventOrganizer = res[0];
        console.log('Entra 3');
      }
    });
  }

}
