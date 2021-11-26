import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass']
})
export class SideMenuComponent implements OnInit {

  faArrowClose = faAngleLeft;
  faArrowOpen = faAngleRight;

  @ViewChild('sidebarMenu') sidebarMenu: ElementRef;
  @ViewChild('sidebarMenuTitle') sidebarMenuTitle: ElementRef;
  @ViewChild('closeSideMenuButton') closeSideMenuButton: ElementRef;
  @ViewChild('openSideMenuButton') openSideMenuButton: ElementRef;

  constructor(private er: ElementRef) {
    this.sidebarMenu = this.er;
    this.sidebarMenuTitle = this.er;
    this.closeSideMenuButton = this.er;
    this.openSideMenuButton = this.er;
  }

  ngOnInit(): void {
  }

  closeSideMenu(): void {
    if (this.sidebarMenu.nativeElement.classList.contains('open')) {
      // Toggle sidebar menu
      this.sidebarMenu.nativeElement.classList.remove('open');
      this.sidebarMenu.nativeElement.classList.add('close');
      // Hide close button
      this.closeSideMenuButton.nativeElement.classList.remove('show');
      this.closeSideMenuButton.nativeElement.classList.add('hide');
      // Show open button
      this.openSideMenuButton.nativeElement.classList.remove('hide');
      this.openSideMenuButton.nativeElement.classList.add('show');
      // Show title
      this.sidebarMenuTitle.nativeElement.classList.remove('show');
      this.sidebarMenuTitle.nativeElement.classList.add('hide');
    }
  }

  openSideMenu(): void {
    if (this.sidebarMenu.nativeElement.classList.contains('close')) {
      // Toggle sidebar menu
      this.sidebarMenu.nativeElement.classList.remove('close');
      this.sidebarMenu.nativeElement.classList.add('open');
      // Show close button
      this.closeSideMenuButton.nativeElement.classList.remove('hide');
      this.closeSideMenuButton.nativeElement.classList.add('show');
      // Hide open button
      this.openSideMenuButton.nativeElement.classList.remove('show');
      this.openSideMenuButton.nativeElement.classList.add('hide');
      // Hide title
      this.sidebarMenuTitle.nativeElement.classList.remove('hide');
      this.sidebarMenuTitle.nativeElement.classList.add('show');
    }
  }
}
