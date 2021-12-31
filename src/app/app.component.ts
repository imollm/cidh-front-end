import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './profile/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  title: string = 'cidh-front-end';
  bannerTitle: string = 'CULTURE IN DA HOUSE';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let url = this.router.url;

        if (url === '/categories') {
          this.bannerTitle = 'CATEGORIES';
        } else if (url === '/labels') {
          this.bannerTitle = 'ETIQUETES';
        } else if (url === '/media/forum') {
          this.bannerTitle = 'FORUM';
        } else if (url === '/search') {
          this.bannerTitle = 'CERCADOR';
        } else {
          this.bannerTitle = 'CULTURE IN DA HOUSE';
        }
      }
    })
  }

  showBanner(): boolean {
    return !this.authService.isLogged() && (!this.router.url.includes('login') && !this.router.url.includes('signup'));
  }
}
