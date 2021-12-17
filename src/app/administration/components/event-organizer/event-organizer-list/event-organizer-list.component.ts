import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventOrganizer } from 'src/app/administration/models/event-organizer.model';
import { EventOrganizerService } from 'src/app/administration/services/event-organizer/event-organizer.service';
import { ModalResultService } from 'src/app/helpers/modal.service';
import { IActionButtons } from 'src/app/shared/components/table/models/action-buttons.model';
import { IDashboardTable } from 'src/app/shared/components/table/models/table.model';

@Component({
  selector: 'app-event-organizer-list',
  templateUrl: './event-organizer-list.component.html',
  styleUrls: ['./event-organizer-list.component.sass']
})
export class EventOrganizerListComponent implements OnInit {

  eventOrganizers: EventOrganizer[] = [];
  dataTable: IDashboardTable = {} as IDashboardTable;
  actionButtons: IActionButtons = {
    active: true,
    resource: '/administration/event-organizer',
    actions: {
      view: true,
      edit: true,
      delete: false
    }
  } as IActionButtons;

  constructor(
    private eventOrganizerService: EventOrganizerService,
    private spinner: NgxSpinnerService,
    private modalResultService: ModalResultService
  ) { }

  ngOnInit(): void {
    this.getEventOrganizers();
  }

  getEventOrganizers(): void {
    this.spinner.show();
    this.eventOrganizerService.listAllEventOrganizers().then(res => {
      if (res.length > 0) {
        this.eventOrganizers = res;
        this.setDataTable();
      }
      this.spinner.hide();
    });
  }

  setDataTable(): void {
    this.dataTable.title = "Empreses registrades";
    this.dataTable.colsName = [
      { colName: "name",  text: "Nom" },
      { colName: "description",  text: "Descripció" }
    ];
    this.dataTable.data = this.eventOrganizers;
  }

}
