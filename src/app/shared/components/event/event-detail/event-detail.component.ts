import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IEvent } from 'src/app/event/models/event.model';
import { EventService } from 'src/app/event/services/event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.sass']
})
export class EventDetailComponent implements OnInit {

  parent: string;
  event: IEvent = {} as IEvent;
  rating: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getEventById(this.route.snapshot.params.id);
  }

  getEventById(eventId: string): void {
    this.spinner.show();

    this.eventService.findEventById(eventId).then(res => {
      if (res) {
        this.event = res;
      } else {
        this.router.navigate(['/home']);
      }
    });

    this.spinner.hide();
  }
}
