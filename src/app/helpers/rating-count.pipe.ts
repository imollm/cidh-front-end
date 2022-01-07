import { Pipe, PipeTransform } from '@angular/core';
import { IRating } from '../event/models/rating.model';

@Pipe({
  name: 'ratingsCount'
})
export class RatingCountPipe implements PipeTransform {

  transform(rating: IRating): number {
    return rating.ratingsCount;
  }

}
