import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.sass']
})
export class BannerComponent implements OnChanges {

  @Input() bannerTitle: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.bannerTitle = changes.bannerTitle.currentValue;
  }
}
