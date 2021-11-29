import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  user: User = {
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
