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
    this.blockBackWebBrowserButton();
  }

  blockBackWebBrowserButton(): void {
    window.navigator.userAgent.toLocaleLowerCase().indexOf('chrome') > -1 ?
      window.location.hash="Again-No-back-button" :
      window.location.hash="no-back-button";
    window.onhashchange=function(){window.location.hash="no-back-button";}
  }
}
