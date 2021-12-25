import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdministratorService } from 'src/app/administration/services/administrator/administrator.service';
import { IUser } from 'src/app/profile/models/user.model';
import { IActionButtons } from 'src/app/shared/components/table/models/action-buttons.model';
import { IDashboardTable } from 'src/app/shared/components/table/models/table.model';

@Component({
  selector: 'app-administrator-list',
  templateUrl: './administrator-list.component.html',
  styleUrls: ['./administrator-list.component.sass']
})
export class AdministratorListComponent implements OnInit {

  title: string = 'Gestiona els Administradors';
  admins: IUser[] = [];
  dataTable: IDashboardTable = {} as IDashboardTable;
  actionButtons: IActionButtons = {
    active: true,
    resource: '/administration/dashboard/event-organizer',
    actions: {
      view: true,
      edit: true,
      delete: false
    }
  } as IActionButtons;

  constructor(
    private adminService: AdministratorService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getEventOrganizers();
  }

  getEventOrganizers(): void {
    this.spinner.show();
    this.adminService.listAllAdministrators().then(res => {
      if (res.length > 0) {
        this.admins = res;
        this.setDataTable();
      }
      this.spinner.hide();
    });
  }

  setDataTable(): void {
    this.dataTable.title = "Administradors registrats";
    this.dataTable.colsName = [
      { colName: "firstName",  text: "Nom" },
      { colName: "lastName", text: "Cognoms" },
      { colName: "fiscalId", text: "ID Fiscal"},
      { colName: "address", text: "Adreça"},
      { colName: "preferredLanguage", text: "Idioma pref."},
      { colName: "email", text: "Email"}
    ];
    this.dataTable.data = this.admins;
  }
}
