import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { IPermissions } from 'src/app/profile/models/permissions.model';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Input() permissions: IPermissions = {} as IPermissions;

  faUserCircle = faUserCircle;

  @ViewChild('profileMenu') profileMenu: ElementRef;

  constructor(
    private elementRef: ElementRef
  ) {
    this.profileMenu = this.elementRef;
  }

  ngOnInit(): void {
    this.permissions = JSON.parse(String(this.permissions));
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
