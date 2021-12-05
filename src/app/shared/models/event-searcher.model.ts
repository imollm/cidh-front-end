
import { Event } from '../../event/models/event.model';
export interface EventSearcher {
  name: string;
  labelId: string;
  labelName: string;
  events: Event[];
}
