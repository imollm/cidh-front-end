import { AfterContentChecked, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.sass']
})
export class BannerComponent implements OnChanges, AfterContentChecked {

  @Input() bannerTitle: string;

  constructor() { }

  ngAfterContentChecked(): void {
    
  }  

  ngOnChanges(changes: SimpleChanges): void {
    this.bannerTitle = changes.bannerTitle.currentValue;
  }
}
