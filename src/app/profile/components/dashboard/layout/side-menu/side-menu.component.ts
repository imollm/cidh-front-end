import { Component, ElementRef, OnInit, ViewChild, Input, ViewChildren, QueryList } from '@angular/core';
import { faAngleLeft, faAngleRight, faBriefcase, faCompressAlt, faCubes, faTags, faUserTie, faQuestion, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/profile/models/user';

@Component({
  selector: 'app-dashboard-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass']
})
export class SideMenuComponent implements OnInit {

  @Input() user: User | undefined;

  faArrowClose = faAngleLeft;
  faArrowOpen = faAngleRight;

  faUserAdmin = faUserTie;
  faCategories = faCubes;
  faEventOrganizers = faBriefcase;
  faAssociateAdminToEvent = faCompressAlt;
  faLabels = faTags;
  faQuestion = faQuestion;
  faEvents = faCalendarDay;


  @ViewChild('sideMenu') sideMenu: ElementRef;
  @ViewChild('sideMenuTitle') sideMenuTitle: ElementRef;
  @ViewChild('closeSideMenuButton') closeSideMenuButton: ElementRef;
  @ViewChild('openSideMenuButton') openSideMenuButton: ElementRef;
  @ViewChildren('sideMenuItemTitle') sideMenuItemsTitle!: QueryList<ElementRef>;

  constructor(private er: ElementRef) {
    this.sideMenu = this.er;
    this.sideMenuTitle = this.er;
    this.closeSideMenuButton = this.er;
    this.openSideMenuButton = this.er;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (window.innerWidth <= 768) {
      this.closeSideMenuButton.nativeElement.classList.add('hide');
      this.openSideMenuButton.nativeElement.classList.add('show');
    } else {
      this.closeSideMenuButton.nativeElement.classList.add('show');
      this.openSideMenuButton.nativeElement.classList.add('hide');
    }
  }

  closeSideMenu(): void {
    // Toggle sidebar menu
    if (this.sideMenu.nativeElement.classList.contains('opened')) {
      this.sideMenu.nativeElement.classList.remove('opened');
    }
    this.sideMenu.nativeElement.classList.add('closed');
    // Hide close button
    if (this.closeSideMenuButton.nativeElement.classList.contains('show')) {
      this.closeSideMenuButton.nativeElement.classList.remove('show');
    }
    this.closeSideMenuButton.nativeElement.classList.add('hide');
    // Show open button
    if (this.openSideMenuButton.nativeElement.classList.contains('hide')) {
      this.openSideMenuButton.nativeElement.classList.remove('hide');
    }
    this.openSideMenuButton.nativeElement.classList.add('show');
    // Show title
    if (this.sideMenuTitle.nativeElement.classList.contains('show')) {
      this.sideMenuTitle.nativeElement.classList.remove('show');
    }
    this.sideMenuTitle.nativeElement.classList.add('hide');
    // Hide titles of items
    this.sideMenuItemsTitle.forEach(element => {
      (element.nativeElement as HTMLElement).style.display = 'none';
    });
  }

  openSideMenu(): void {
    // Toggle side menu
    if (this.sideMenu.nativeElement.classList.contains('closed')) {
      this.sideMenu.nativeElement.classList.remove('closed');
    }
    this.sideMenu.nativeElement.classList.add('opened');
    // Hide open button
    if (this.openSideMenuButton.nativeElement.classList.contains('show')) {
      this.openSideMenuButton.nativeElement.classList.remove('show');
    }
    this.openSideMenuButton.nativeElement.classList.add('hide');
    // Show close button
    if (this.closeSideMenuButton.nativeElement.classList.contains('hide')) {
      this.closeSideMenuButton.nativeElement.classList.remove('hide');
    }
    this.closeSideMenuButton.nativeElement.classList.add('show');
    // Hide title
    if (this.sideMenuTitle.nativeElement.classList.contains('hide')) {
      this.sideMenuTitle.nativeElement.classList.remove('hide');
    }
    this.sideMenuTitle.nativeElement.classList.add('show');
    // Show titles of items
    this.sideMenuItemsTitle.forEach(element => {
      let item = ((element.nativeElement as HTMLElement).parentNode as HTMLElement);
      let icon = (item?.childNodes[0] as HTMLElement);
      let title = (item?.childNodes[1] as HTMLElement);

      item.style.justifyContent = 'start';
      item.style.listStyle = 'none';
      item.style.textAlign = 'left';
      item.style.padding = '1em 0';
      item.style.cursor = 'pointer';
      item.style.paddingLeft = '1em';

      icon.style.marginLeft = '1em';
      icon.style.marginRight = '1em';
      icon.style.fontSize = '24px';

      title.style.display = 'inline-block';
      title.style.fontSize = '1em';
      title.style.fontWeight = 'bold';
      title.style.color = '#161925';
    });
  }

  hideSideMenuTitles(): void {

  }
}
