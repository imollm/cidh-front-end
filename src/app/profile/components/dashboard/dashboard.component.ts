import { Component, OnInit } from '@angular/core';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  user: IUser = {
    name: "",
    surname: "",
    fiscalId: "",
    address: "",
    language: "",
    email: "",
    password: "",
    role: "admin",
    permissions: {
      administration: {
        manageCategories: true,
        manageEventOrganizers: true,
        manageAdministrators: true,
        associateAdminToEventOrganizer: true,
        manageLabels: true
      },
      profile: {
        manageEvents: false,
        modifyPersonalData: true
      },
      event: {
        getEventSubscription: false,
        listEventsByCategory: false,
        searchEventByLabel: false,
        searchEventByName: false,
        consultEventData: false,
        subscriptionsHistory: false,
        accessToEvent: false
      },
      media: {
        sendACommentAboutEvent: false,
        makeRatingAboutEvent: false,
        recommendEventToAFriend: false,
        addEventToHisFavourites: false,
        consultHisFavouritesEvents: false,
        answerForumQuestion: true,
        viewForumQuestions: true,
        makeForumQuestion: false
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
