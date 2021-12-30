import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { IRating } from 'src/app/event/models/rating.model';

@Component({
  selector: 'app-event-rating',
  templateUrl: './event-rating.component.html',
  styleUrls: ['./event-rating.component.sass']
})
export class EventRatingComponent implements OnChanges, AfterContentChecked {
  
  @Input() rating: IRating;
  faStar = faStar;
  currentRating: number;
  isPrinted: boolean = false;

  @ViewChildren('star', { read: ElementRef }) stars: QueryList<ElementRef>;

  constructor() { }

  ngAfterContentChecked(): void {
    if (this.rating.rating > 0) {
      this.setStars();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.rating = changes.rating.currentValue;
    this.currentRating = this.rating.rating;

    if (!changes.rating.firstChange && this.rating.rating === 0) {
      this.setStars();
    }
  }

  setStars(): void {
    if (this.rating.rating > 0 && this.stars && !this.isPrinted) {
      this.stars.forEach(star => {
        this.currentRating >= 1
        ? star.nativeElement.classList.add('enabled')
        : star.nativeElement.classList.add('disabled');
        this.currentRating--;
      })
      this.isPrinted = true;
    }
  }
}
