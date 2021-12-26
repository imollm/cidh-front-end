import { Component, Input, OnInit } from '@angular/core';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-rating',
  templateUrl: './event-rating.component.html',
  styleUrls: ['./event-rating.component.sass']
})
export class EventRatingComponent implements OnInit {
  
  @Input() rating: number;
  @Input() readonly: boolean;
  maxRating: number = 5;
  stars: boolean[] = [];
  faStar = faStar;
  faStarHalf = faStarHalfAlt;

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < this.maxRating; i++) {
      this.stars.push(i < this.rating);
    }
  }

}