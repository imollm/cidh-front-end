/**
 * TODO: USER: 
 * last 3 subscribed events + 
 * last next 3 events to be celebrated + 
 * total of subscribed events (count).
 * 
 * 2 tables
 * 1 card
 */
interface UserHomeData {
    subscribedEvents: [];
    eventsToBeCelebrated: [];
    totalOfSubscribedEvents: number;
}
/**
   * TODO: ADMIN:
   * total events that this admin manage (count) + 
   * last 3 events that this admin manage + 
   * pending questions to be answered.
   * 
   * 2 tables
   * 1 card
   */
interface AdminHomeData {
    totalEventsManaged: number;
    eventsManaged: [];
    pendingQuestionsToBeAnswered: [];
}
/**
     * TODO: SUPERADMIN: 
     * last 3 events in the system + 
     * last 3 event organizers in the system + 
     * last 3 labels in the system + 
     * last 3 admins in the system + 
     * last 3 categories in the system + 
     * pending questions to be answered.
     * 
     * 5 tables
     * 1 card
     */
interface SuperAdminHomeData {
    lastSavedEventsInTheSystem: [];
    lastEventOrganizersInTheSystem: [];
    lastLabelsInTheSystem: [];
    lastAdminsInTheSystem: [];
    lastCategoriesInTheSystem: [];
    pendingQuestionsToBeAnswered: [];
}

export interface IUser {
    id?: string;
    firstName: string;
    lastName: string;
    fiscalId: string;
    address: string;
    preferredLanguage: string;
    email: string;
    password?: string;
    homeData?: {
        user?: UserHomeData,
        admin?: AdminHomeData,
        superadmin?: SuperAdminHomeData
    }
}
