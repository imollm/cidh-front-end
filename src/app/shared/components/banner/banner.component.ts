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
    let url = this.router.url;
    if (url.indexOf('/forum') > -1) {
      this.bannerTitle = 'FORUM';
    } else if (url.indexOf('/categories') > -1) {
      this.bannerTitle = 'CATEGORIES';
    } else if (url.indexOf('/labels') > -1) {
      this.bannerTitle = 'ETIQUETES';
    } else if (url.indexOf('/search') > -1) {
      this.bannerTitle = 'RESULTATS CERCA';
    }
  }
}
