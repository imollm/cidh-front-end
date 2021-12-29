import { Component } from '@angular/core';
import { AuthService } from './profile/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  title = 'cidh-front-end';

  constructor(
    private authService: AuthService
  ) { }

  isDashboard(): boolean {
    return this.authService.isLogged();
  }
}
