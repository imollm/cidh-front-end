import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { IRating } from 'src/app/event/models/rating.model';

@Component({
  selector: 'app-event-rating',
  templateUrl: './event-rating.component.html',
  styleUrls: ['./event-rating.component.sass']
})
export class EventRatingComponent implements OnInit, OnChanges {

  @Input() rating: IRating;
  faStar = faStar;

  constructor() { }

  ngOnInit(): void {
    this.setStars();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.rating = changes.rating.currentValue;
    this.setStars();
  }

  setStars(): void {
    let stars = document.querySelectorAll('fa-icon.star');
    let currentRating = this.rating.rating;

    for (let i = 0; i < 5; i++) {
      (stars[i] as HTMLElement).style.color = '';

      if (currentRating >= 1) {
        (stars[i] as HTMLElement).style.color = 'yellow';
      }
      currentRating--;
    }
  }
}
