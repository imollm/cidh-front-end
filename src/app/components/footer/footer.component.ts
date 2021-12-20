import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/profile/services/auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit{
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log(!this.isLogged());
  }

  isLogged(): Boolean{
    return !this.authService.isLogged();
  }
}
