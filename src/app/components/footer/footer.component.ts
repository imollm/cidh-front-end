import { Component } from '@angular/core';
import { AuthService } from 'src/app/profile/services/auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent {
  
  constructor(private authService: AuthService) { }

  isLogged(): Boolean{
    return !this.authService.isLogged();
  }
}
