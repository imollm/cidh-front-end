import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.sass']
})
export class BannerComponent implements OnInit {

  bannerTitle = 'CULTURE IN DA HOUSE';

  constructor() { }

  ngOnInit(): void {
  }

}
