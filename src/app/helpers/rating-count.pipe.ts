import { Pipe, PipeTransform } from '@angular/core';
import { IRating } from '../event/models/rating.model';

@Pipe({
  name: 'ratingCount'
})
export class RatingCountPipe implements PipeTransform {

  transform(rating: IRating): number {
    return rating.ratingsCount;
  }

}
