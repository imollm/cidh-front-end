export interface Event {
    name: string;
    description: string;
    picture: string | undefined;
    rating: number;
    location: string;
    initDate: Date;
    endDate: Date;
    // category: Category;
    // labels: Label[];
    // eventOrganizer: EventOrganizer;
    // administrator: User;
    // questions: Question[];
    // comments: Comment[];
    // ratings: Rating[];
    // subscribers: User[];
}
