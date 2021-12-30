export interface IPermissions {
    "administration": {
        "manageCategories": boolean,
        "manageEventOrganizers": boolean,
        "manageAdministrators": boolean,
        "manageLabels": boolean,
    },
    "profile": {
        "manageEvents": boolean,
        "modifyPersonalData": boolean,
    },
    "event": {
        "getEventSubscription": boolean,
        "listEventsByCategory": boolean,
        "searchEventByLabel": boolean,
        "searchEventByName": boolean,
        "consultEventData": boolean,
        "subscriptionsHistory": boolean,
        "accessToEvent": boolean,
    },
    "media": {
        "sendACommentAboutEvent": boolean,
        "makeRatingAboutEvent": boolean,
        "recommendEventToAFriend": boolean,
        "addEventToHisFavourites": boolean,
        "consultHisFavouritesEvents": boolean,
        "answerForumQuestion": boolean,
        "viewForumQuestions": boolean,
        "makeForumQuestion": boolean,
    }
}
