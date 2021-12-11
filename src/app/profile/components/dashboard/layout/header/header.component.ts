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

  @Input() permissions: IPermissions = {} as IPermissions;
  user: IUser;

  faUserCircle = faUserCircle;

  @ViewChild('profileMenu') profileMenu: ElementRef;

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService
  ) {
    this.profileMenu = this.elementRef;
  }

  ngOnInit(): void {
    this.permissions = JSON.parse(String(this.permissions));
    this.authService.getUser().then(user => {
      this.user = user;
    });
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
}
