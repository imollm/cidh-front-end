import { Component } from '@angular/core';
import { IDashboardTable } from 'src/app/shared/components/table/models/table.model';
import { IActionButtons } from 'src/app/shared/components/table/models/action-buttons.model';
import { AuthService } from 'src/app/profile/services/auth/auth.service';
import { IUser } from 'src/app/profile/models/user.model';
import { UtilsService } from 'src/app/helpers/utils.helper.service';
import { EventService } from 'src/app/event/services/event.service';
import { EventOrganizerService } from 'src/app/administration/services/event-organizer/event-organizer.service';
import { LabelService } from 'src/app/administration/services/label/label.service';
import { CategoryService } from 'src/app/administration/services/category/category.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
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
  adminTablePendingQuestionsToBeAnswered: IDashboardTable =
    {} as IDashboardTable;
  // Admin card
  adminTotalEventsManaged: number;

  // SuperAdmin tables
  superAdminTableLastSavedEventsInTheSystem: IDashboardTable =
    {} as IDashboardTable;
  superAdminTableLastEventOrganizersInTheSystem: IDashboardTable =
    {} as IDashboardTable;
  superAdminTableLastLabelsInTheSystem: IDashboardTable = {} as IDashboardTable;
  superAdminTableLastAdminsInTheSystem: IDashboardTable = {} as IDashboardTable;
  superAdminTableLastCategoriesInTheSystem: IDashboardTable =
    {} as IDashboardTable;

  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private eventOrganizerService: EventOrganizerService,
    private labelService: LabelService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.authService
      .getUser()
      .then((res) => {
        if (res && res.id) {
          this.me = res;
        }
      })
      .then(() => {
        this.role = UtilsService.getRoleFromAccessToken();

        if (this.role === 'USER') {
          this.setUserHome();
        } else if (this.role === 'ADMIN') {
          this.setAdminHome();
        } else if (this.role === 'SUPERADMIN') {
          this.setSuperAdminHome();
        }
      });
  }

  async setUserHome(): Promise<void> {
    const events = await this.eventService.findSubscriptionsByUser(this.me.id);
    const eventsSubscribed = events.filter((event) => event.isUserSubscribed);
    const currentDay = Date.now() / 1000;
    const eventSubscribedNotCelebrated = eventsSubscribed.filter(
      (event) => event.startDate > currentDay
    );

    this.userTableSubscribedEvents.title = 'Últims events subscrits';
    this.userTableSubscribedEvents.colsName = [
      { colName: 'name', text: 'Nom' },
      { colName: 'description', text: 'Descripció' },
    ];
    this.userTableSubscribedEvents.data = eventsSubscribed;
    this.userTableSubscribedEvents.inverse = false;

    this.userTableEventsToBeCelebrated.title =
      'Pròximes subscripcions celebrades';
    this.userTableEventsToBeCelebrated.colsName = [
      { colName: 'name', text: 'Nom' },
      { colName: 'description', text: 'Descripció' },
    ];
    this.userTableEventsToBeCelebrated.data = eventSubscribedNotCelebrated;
    this.userTableEventsToBeCelebrated.inverse = false;

    this.userTotalOfSubscribedEvents = eventsSubscribed.length;
  }

  async setAdminHome(): Promise<void> {
    const events = await this.eventService.findSubscriptionsByAdmin(this.me.id);
    const eventIds = events.map((event) => event.id);
    const messages = await Promise.all(
      eventIds.map((eventId) =>
        this.eventService
          .getForumByEvent(eventId)
          .then((eventForum) => eventForum.messages)
      )
    );
    const answeredIds = messages
      .flat()
      .filter((message) => message.parentMessageId)
      .map((message) => message.id);
    const unansweredMessages = messages
      .flat()
      .filter((message) => !answeredIds.includes(message.id));

    this.adminTableEventsManaged.title = 'Events que coordines';
    this.adminTableEventsManaged.colsName = [
      { colName: 'name', text: 'Nom' },
      { colName: 'description', text: 'Descripció' },
    ];
    this.adminTableEventsManaged.data = events;
    this.adminTableEventsManaged.inverse = false;

    this.adminTablePendingQuestionsToBeAnswered.title =
      'Preguntes pendents de contestar';
    this.adminTablePendingQuestionsToBeAnswered.colsName = [
      { colName: 'authorFirstName', text: 'Nom del usuari' },
      { colName: 'message', text: 'Missatge' },
    ];
    this.adminTablePendingQuestionsToBeAnswered.data = unansweredMessages;
    this.adminTablePendingQuestionsToBeAnswered.inverse = false;

    this.adminTotalEventsManaged = events.length;
  }

  async setSuperAdminHome(): Promise<void> {
    const eventOrganizers =
      await this.eventOrganizerService.listAllEventOrganizers();
    const labels = await this.labelService.listAllLabels();
    const categories = await this.categoryService.listAllCategories();

    this.superAdminTableLastEventOrganizersInTheSystem.title =
      'Empreses que coordines';
    this.superAdminTableLastEventOrganizersInTheSystem.colsName = [
      { colName: 'name', text: 'Nom' },
      { colName: 'description', text: 'Descripció' },
    ];
    this.superAdminTableLastEventOrganizersInTheSystem.data = eventOrganizers;
    this.superAdminTableLastEventOrganizersInTheSystem.inverse = false;

    this.superAdminTableLastLabelsInTheSystem.title = 'Etiquetes que coordines';
    this.superAdminTableLastLabelsInTheSystem.colsName = [
      { colName: 'name', text: 'Nom' },
      { colName: 'description', text: 'Descripció' },
    ];
    this.superAdminTableLastLabelsInTheSystem.data = labels;
    this.superAdminTableLastLabelsInTheSystem.inverse = false;

    this.superAdminTableLastCategoriesInTheSystem.title =
      'Categories que coordines';
    this.superAdminTableLastCategoriesInTheSystem.colsName = [
      { colName: 'name', text: 'Nom' },
      { colName: 'description', text: 'Descripció' },
    ];
    this.superAdminTableLastCategoriesInTheSystem.data = categories;
    this.superAdminTableLastCategoriesInTheSystem.inverse = false;
  }
}
