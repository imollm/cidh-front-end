import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  faMobileMenuIcon = faBars;
  @ViewChild('MobileMenu') mobileMenu: ElementRef;

  constructor(private element: ElementRef) {
    this.mobileMenu = this.element;
  }

  ngOnInit(): void {
  }

  closeMobileMenu(): void {
    this.mobileMenu.nativeElement.style.display = 'none';
  }

  openMobileMenu(): void {
    this.mobileMenu.nativeElement.style.display = 'block';
  }

  isDashboard(): boolean {
    return window.location.href.indexOf('dashboard') > -1;
  }

}
