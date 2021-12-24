
import { Category } from 'src/app/administration/models/category.model';
import { Label } from 'src/app/administration/models/label.model';
import { IEvent } from '../../event/models/event.model';
export interface EventSearcher {
  name?: string[];
  label?: Label[];
  category?: Category[];
  events?: IEvent[];
}
