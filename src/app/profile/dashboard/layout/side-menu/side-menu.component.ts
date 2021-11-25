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
  @ViewChild('closeSideMenuArrow') closeSideMenuArrow: ElementRef;
  @ViewChild('openSideMenuArrow') openSideMenuArrow: ElementRef;

  constructor(private er: ElementRef) {
    this.sidebarMenu = this.er;
    this.closeSideMenuArrow = this.er;
    this.openSideMenuArrow = this.er;
  }

  ngOnInit(): void {
  }

  closeSideMenu(): void {
    if (this.sidebarMenu.nativeElement.classList.contains('open')) {
      this.sidebarMenu.nativeElement.classList.remove('open');
      this.sidebarMenu.nativeElement.classList.add('close');
      this.closeSideMenuArrow.nativeElement.classList.remove('show');
      this.closeSideMenuArrow.nativeElement.classList.add('hide');
      this.openSideMenuArrow.nativeElement.classList.remove('hide');
      this.openSideMenuArrow.nativeElement.classList.remove('show');
    }
  }

  openSideMenu(): void {
    if (this.sidebarMenu.nativeElement.classList.contains('close')) {
      this.sidebarMenu.nativeElement.classList.remove('close');
      this.sidebarMenu.nativeElement.classList.add('open');
      this.openSideMenuArrow.nativeElement.classList.remove('show');
      this.openSideMenuArrow.nativeElement.classList.add('hide');
      this.closeSideMenuArrow.nativeElement.classList.remove('show');
      this.closeSideMenuArrow.nativeElement.classList.remove('hide');
    }
  }
}
