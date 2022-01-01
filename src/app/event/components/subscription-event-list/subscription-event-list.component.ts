import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IActionButtons } from 'src/app/shared/components/table/models/action-buttons.model';
import { IDashboardTable } from 'src/app/shared/components/table/models/table.model';
import { IEvent } from '../../models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-subscription-event-list',
  templateUrl: './subscription-event-list.component.html',
  styleUrls: ['./subscription-event-list.component.sass'],
})
export class SubscriptionEventListComponent implements OnInit {
  title: string = 'Actes als quals estàs subscrit';
  subscriptions: IEvent[] = [];
  dataTable: IDashboardTable = {} as IDashboardTable;
  actionButtons: IActionButtons = {
    active: true,
    resource: '/event/dashboard/event',
    actions: {
      view: true,
      edit: false,
      delete: false,
    },
  } as IActionButtons;

  constructor(
    private eventService: EventService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getSubscriptions();
  }

  getSubscriptions(): void {
    this.spinner.show();
    this.eventService.getAllEvents().then((res) => {
      if (res.length > 0) {
        this.subscriptions = res.filter((event) => event.isUserSubscribed);
        this.setDataTable();
      }
      this.spinner.hide();
    });
  }

  setDataTable(): void {
    this.dataTable.title = 'Events Subscrits';
    this.dataTable.colsName = [
      { colName: 'name', text: 'Nom' },
      { colName: 'description', text: 'Descripció' },
      { colName: 'eventUrl', text: 'URL del acte' },
    ];
    this.dataTable.data = this.subscriptions;
  }
}
