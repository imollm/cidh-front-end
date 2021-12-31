import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IEvent } from 'src/app/event/models/event.model';
import { EventProfileService } from 'src/app/profile/services/event/eventProfile.service';
import { IActionButtons } from 'src/app/shared/components/table/models/action-buttons.model';
import { IDashboardTable } from 'src/app/shared/components/table/models/table.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-profile-list.component.html',
  styleUrls: ['./event-profile-list.component.sass']
})
export class EventListComponent implements OnInit {

  title: string = 'Gestiona els actes';
  event: IEvent[] = [];
  dataTable: IDashboardTable = {} as IDashboardTable;
  actionButtons: IActionButtons = {
    active: true,
    resource: '/profile/dashboard/events',
    actions: {
      view: false,
      edit: true,
      delete: false
    }
  } as IActionButtons;

  constructor(
    private eventService: EventProfileService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getEventOrganizers();
  }

  getEventOrganizers(): void {
    this.spinner.show();
    this.eventService.listAllEvents().then(res => {
      if (res.length > 0) {
        this.event = res;
        this.setDataTable();
      }
      this.spinner.hide();
    });
  }

  setDataTable(): void {
    this.dataTable.title = "Actes registrats";
    this.dataTable.colsName = [
      { colName: "name",  text: "Nom" },
      { colName: "description",  text: "Descripció" },
    ];
    this.dataTable.data = this.event;
  }
}
