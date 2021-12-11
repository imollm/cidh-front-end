import { Component, OnInit } from '@angular/core';
import { IPermissions } from '../../models/permissions.model';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  permissions: IPermissions;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentMessage.subscribe(data => {
      this.permissions = data.permissions;
    });
  }
}
