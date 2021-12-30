import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { IPermissions } from 'src/app/profile/models/permissions.model';
import { IUser } from 'src/app/profile/models/user.model';
import { AuthService } from 'src/app/profile/services/auth/auth.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  permissions: IPermissions = {} as IPermissions;
  user: IUser = {} as IUser;

  faUserCircle = faUserCircle;

  @ViewChild('profileMenu') profileMenu: ElementRef;

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService
  ) {
    this.profileMenu = this.elementRef;
  }

  ngOnInit(): void {
    this.getUser();
  }

  toggleProfileMenu(): void {
    if (this.profileMenu.nativeElement.classList.contains('hide')) {
      this.profileMenu.nativeElement.classList.remove('hide');
      this.profileMenu.nativeElement.classList.add('show');
    } else if (this.profileMenu.nativeElement.classList.contains('show')) {
      this.profileMenu.nativeElement.classList.remove('show');
      this.profileMenu.nativeElement.classList.add('hide');
    }
  }

  getUser(): void {
    this.authService.getUser().then(res => {
      if (res) {
        this.user = res; 
        if (res.permissions) {
          this.permissions = JSON.parse(String(res.permissions));
        }
      }
    }).catch(err => console.log(err));
  }
}
