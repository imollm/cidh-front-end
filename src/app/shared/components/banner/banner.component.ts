import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.sass']
})
export class BannerComponent implements OnInit {

  bannerTitle = 'CULTURE IN DA HOUSE';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setTitle();
  }

  private setTitle(): void {
    if (this.router.url.indexOf('/forum') > -1) {
      this.bannerTitle = 'FORUM';
    }
  }
}
