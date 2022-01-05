import { Pipe, PipeTransform } from '@angular/core';
import { IRating } from '../event/models/rating.model';

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {

  transform(rating: IRating): number {
    return rating.rating;
  }

}
