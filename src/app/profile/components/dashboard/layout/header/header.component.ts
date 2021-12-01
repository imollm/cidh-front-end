import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { IUser } from 'src/app/profile/models/user.model';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Input() user: IUser | undefined;
  faUserCircle = faUserCircle;
  @ViewChild('profileMenu') profileMenu: ElementRef;

  constructor(private elementRef: ElementRef) {
    this.profileMenu = this.elementRef;
  }

  ngOnInit(): void {
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
