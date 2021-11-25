import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  faUserCircle = faUserCircle;
  @ViewChild('profileMenu') profileMenu: ElementRef;

  constructor(private elementRef: ElementRef) {
    this.profileMenu = this.elementRef;
  }

  ngOnInit(): void {
  }

  toggleProfileMenu(): void {
    this.profileMenu.nativeElement.style.display
      = this.profileMenu.nativeElement.style.display
        === 'none' ? 'block' : 'none';
  }

}
