import { Component } from '@angular/core';
import { IDashboardTable } from 'src/app/shared/components/table/models/table.model';
import { IActionButtons } from 'src/app/shared/components/table/models/action-buttons.model';
import { AuthService } from 'src/app/profile/services/auth/auth.service';
import { IUser } from 'src/app/profile/models/user.model';
import { UtilsService } from 'src/app/helpers/utils.helper.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  formTitle = 'Home';
  me: IUser;
  role: string;
  dataTable: IDashboardTable = {} as IDashboardTable;
  actionButtons: IActionButtons = {
    active: false
  } as IActionButtons;

  // User tables
  userTableSubscribedEvents: IDashboardTable = {} as IDashboardTable;
  userTableEventsToBeCelebrated: IDashboardTable = {} as IDashboardTable;
  // User card
  userTotalOfSubscribedEvents: number;

  // Admin tables
  adminTableEventsManaged: IDashboardTable = {} as IDashboardTable;
  adminTablePendingQuestionsToBeAnswered: IDashboardTable = {} as IDashboardTable;
  // Admin card
  adminTotalEventsManaged: number;

  // SuperAdmin tables
  superAdminTableLastSavedEventsInTheSystem: IDashboardTable = {} as IDashboardTable;
  superAdminTableLastEventOrganizersInTheSystem: IDashboardTable = {} as IDashboardTable;
  superAdminTableLastLabelsInTheSystem: IDashboardTable = {} as IDashboardTable;
  superAdminTableLastAdminsInTheSystem: IDashboardTable = {} as IDashboardTable;
  superAdminTableLastCategoriesInTheSystem: IDashboardTable = {} as IDashboardTable;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser().then(res => {
      if (res && res.id) {
        this.me = res;
      }
    }).then(() => {
      this.role = UtilsService.getRoleFromAccessToken();

      if (this.role === 'USER') {
        //this.setUserHome();
      } else if (this.role === 'ADMIN') {
        //this.setAdminHome();
      } else if (this.role === 'SUPERADMIN') {
        //this.setSuperAdminHome();
      }

      this.setDataTable();
    });
  }

  setUserHome(): void {
    this.userTableSubscribedEvents.title = 'Últims events subscrits';
    this.userTableSubscribedEvents.colsName = [];
    this.userTableSubscribedEvents.data = this.me.homeData.user.subscribedEvents;
    this.userTableSubscribedEvents.inverse = false;

    this.userTableEventsToBeCelebrated.title = 'Pròximes subscripcions celebrades';
    this.userTableEventsToBeCelebrated.colsName = [];
    this.userTableEventsToBeCelebrated.data = this.me.homeData.user.eventsToBeCelebrated;
    this.userTableEventsToBeCelebrated.inverse = false;

    this.userTotalOfSubscribedEvents = this.me.homeData.user.totalOfSubscribedEvents;
  }

  setAdminHome(): void {
    this.adminTableEventsManaged.title = 'Events que coordines';
    this.adminTableEventsManaged.colsName = [];
    this.adminTableEventsManaged.data = this.me.homeData.admin.eventsManaged;
    this.adminTableEventsManaged.inverse = false;

    this.adminTablePendingQuestionsToBeAnswered.title = 'Preguntes pendents de contestar';
    this.adminTablePendingQuestionsToBeAnswered.colsName = [];
    this.adminTablePendingQuestionsToBeAnswered.data = this.me.homeData.admin.pendingQuestionsToBeAnswered;
    this.adminTablePendingQuestionsToBeAnswered.inverse = false;

    this.adminTotalEventsManaged = this.me.homeData.admin.totalEventsManaged;
  }

  setSuperAdminHome(): void {
    this.superAdminTableLastSavedEventsInTheSystem.title = 'Events que coordines';
    this.superAdminTableLastSavedEventsInTheSystem.colsName = [];
    this.superAdminTableLastSavedEventsInTheSystem.data = this.me.homeData.superadmin.lastSavedEventsInTheSystem;
    this.superAdminTableLastSavedEventsInTheSystem.inverse = false;

    this.superAdminTableLastEventOrganizersInTheSystem.title = 'Events que coordines';
    this.superAdminTableLastEventOrganizersInTheSystem.colsName = [];
    this.superAdminTableLastEventOrganizersInTheSystem.data = this.me.homeData.superadmin.lastEventOrganizersInTheSystem;
    this.superAdminTableLastEventOrganizersInTheSystem.inverse = false;

    this.superAdminTableLastLabelsInTheSystem.title = 'Events que coordines';
    this.superAdminTableLastLabelsInTheSystem.colsName = [];
    this.superAdminTableLastLabelsInTheSystem.data = this.me.homeData.superadmin.lastLabelsInTheSystem;
    this.superAdminTableLastLabelsInTheSystem.inverse = false;

    this.superAdminTableLastAdminsInTheSystem.title = 'Events que coordines';
    this.superAdminTableLastAdminsInTheSystem.colsName = [];
    this.superAdminTableLastAdminsInTheSystem.data = this.me.homeData.superadmin.lastAdminsInTheSystem;
    this.superAdminTableLastAdminsInTheSystem.inverse = false;

    this.superAdminTableLastCategoriesInTheSystem.title = 'Events que coordines';
    this.superAdminTableLastCategoriesInTheSystem.colsName = [];
    this.superAdminTableLastCategoriesInTheSystem.data = this.me.homeData.superadmin.lastCategoriesInTheSystem;
    this.superAdminTableLastCategoriesInTheSystem.inverse = false;
  }

  setDataTable(): void {
    this.dataTable.title = 'Títol de la taula';
    this.dataTable.colsName = [
      { colName: 'name', text: 'Nom' },
      { colName: 'email', text: 'Email' },
    ];
    this.dataTable.data = [
      { name: 'Juan', email: 'correo@correo.com' },
      { name: 'Juan', email: 'correo@correo.com' },
    ];
    this.dataTable.inverse = false;
  }


}


