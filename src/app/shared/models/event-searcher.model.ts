import { IEvent } from '../../event/models/event.model';
export interface EventSearcher {
  name?: string[];
  label?: string[];
  category?: string[];
  events?: IEvent[];
}
