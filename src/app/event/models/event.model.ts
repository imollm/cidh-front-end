export interface IEvent {
    id?: string;
    name: string;
    description: string;
    headerImage?: string;
    rating?: number;
    location: string;
    startDate?: Date;
    endDate?: Date;
    // category: Category;
    // labels: Label[];
    // eventOrganizer: EventOrganizer;
    // administrator: User;
    // questions: Question[];
    // comments: Comment[];
    // ratings: Rating[];
    // subscribers: User[];
}
