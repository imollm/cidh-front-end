import { Component, OnInit } from '@angular/core';
import { IPermissions } from '../../models/permissions.model';
import { IUser } from '../../models/user.model';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  user: IUser;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getUser().then(user => {
      this.user = user;
    }).then(() => {
      console.log(this.user);
    });
  }
}
