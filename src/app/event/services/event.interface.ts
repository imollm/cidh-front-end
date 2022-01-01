import { EventSearcher as EventSearcherModel } from "src/app/shared/models/event-searcher.model";
import { IEventForum } from "../models/event-forum.model";
import { IEvent } from "../models/event.model";

export interface IEventService {
  subscribe(eventId: string): Promise<void>;
  unsubscribe(eventId: string): Promise<void>;
  upcomingEvents(limit: string): Promise<IEvent[]>;
  findEvents(searchParams: EventSearcherModel): Promise<IEvent[]>;
  findEventById(eventId: string): Promise<IEvent>;
  findSubscriptionsByUser(email: string): Promise<IEvent[]>;
  findSubscriptionsByAdmin(adminId: string): Promise<IEvent[]>;
  getAllComments(eventId: string): Promise<[]>;
  getForumByEvent(eventId: string): Promise<IEventForum>;
}
