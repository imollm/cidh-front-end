import { Component, OnInit, ViewChild } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass']
})
export class SideMenuComponent implements OnInit {

  faArrowClose = faArrowLeft;
  faArrowOpen = faArrowRight;

  @ViewChild('sidebarMenu') sidebarMenu: any;
  @ViewChild('closeSideMenuArrow') closeSideMenuArrow: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  closeSideMenu() {
    if (this.sidebarMenu.nativeElement.classList.contains('open')) {
      this.sidebarMenu.nativeElement.classList.remove('open');
      this.sidebarMenu.nativeElement.classList.add('close');
    }
  }

}
