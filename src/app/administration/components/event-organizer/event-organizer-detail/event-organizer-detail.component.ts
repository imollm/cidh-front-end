import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEventOrganizer } from 'src/app/administration/models/event-organizer.model';
import { AdministratorService } from 'src/app/administration/services/administrator/administrator.service';
import { EventOrganizerService } from 'src/app/administration/services/event-organizer/event-organizer.service';
import { UtilsService } from 'src/app/helpers/utils.helper.service';
import { IUser } from 'src/app/profile/models/user.model';

@Component({
  selector: 'app-event-organizer-detail',
  templateUrl: './event-organizer-detail.component.html',
  styleUrls: ['./event-organizer-detail.component.sass']
})
export class EventOrganizerDetailComponent implements OnInit {

  title: string = "Detalls de l'empresa";
  eventOrganizer: IEventOrganizer = {} as IEventOrganizer;
  admin: IUser = {} as IUser;

  constructor(
    private eventOrganizerService: EventOrganizerService,
    private router: Router,
    private adminService: AdministratorService
  ) { }

  ngOnInit(): void {
    this.eventOrganizer.id = UtilsService.getResourceIdFromURI(this.router.url);
    this.getEventOrganizer();
  }

  getEventOrganizer(): void {
    this.eventOrganizerService.showEventOrganizer(this.eventOrganizer.id).then(res => {
      if (res) {
        this.eventOrganizer = res;
      }
    }).then(() => this.getAdmin())
    .catch(err => console.error(err));
  }

  getAdmin(): void {
    this.adminService.showAdministrator(this.eventOrganizer.admin).then(res => {
      if (res) {
        this.admin = res;
      }
    }).catch(err => console.error(err));
  }

}
