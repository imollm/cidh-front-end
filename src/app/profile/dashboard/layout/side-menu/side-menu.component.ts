import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/profile/models/user';

@Component({
  selector: 'app-dashboard-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass']
})
export class SideMenuComponent implements OnInit, AfterViewInit {

  @Input() user: User | undefined;

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

  ngAfterViewInit(): void {
    if (window.innerWidth <= 768) {
      this.sidebarMenu.nativeElement.classList.add('closed');
      this.closeSideMenuButton.nativeElement.classList.add('hide');
      this.openSideMenuButton.nativeElement.classList.add('show');
    } else {
      this.sidebarMenu.nativeElement.classList.add('opened');
      this.closeSideMenuButton.nativeElement.classList.add('show');
      this.openSideMenuButton.nativeElement.classList.add('hide');
    }
  }

  closeSideMenu(): void {
    if (this.sidebarMenu.nativeElement.classList.contains('opened')) {
      if (
        this.closeSideMenuButton.nativeElement.classList.contains('show') &&
        this.openSideMenuButton.nativeElement.classList.contains('hide')
        ) {
        // Toggle sidebar menu
        this.sidebarMenu.nativeElement.classList.remove('opened');
        this.sidebarMenu.nativeElement.classList.add('closed');
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
  }

  openSideMenu(): void {
    if (this.sidebarMenu.nativeElement.classList.contains('closed')) {
      if (
        this.openSideMenuButton.nativeElement.classList.contains('show') &&
        this.closeSideMenuButton.nativeElement.classList.contains('hide')
        ) {
        // Toggle sidebar menu
        this.sidebarMenu.nativeElement.classList.remove('closed');
        this.sidebarMenu.nativeElement.classList.add('opened');
        // Hide open button
        this.openSideMenuButton.nativeElement.classList.remove('show');
        this.openSideMenuButton.nativeElement.classList.add('hide');
        // Show close button
        this.closeSideMenuButton.nativeElement.classList.remove('hide');
        this.closeSideMenuButton.nativeElement.classList.add('show');
        // Hide title
        this.sidebarMenuTitle.nativeElement.classList.remove('hide');
        this.sidebarMenuTitle.nativeElement.classList.add('show');
      }
    }
  }

  showSubMenu(event: Event): void {
    const item = (event.target as HTMLElement);
    const subMenu = item.querySelector('ul');
    if (subMenu?.classList.contains('hide')) {
      subMenu.classList.remove('hide');
    }
    subMenu?.classList.add('show');
  }

  hideSubMenu(event: Event): void {
    const item = (event.target as HTMLElement);
    const subMenu = item.querySelector('ul');
    if (subMenu?.classList.contains('show')) {
      subMenu.classList.remove('show');
    }
    subMenu?.classList.add('hide');
  }
}
