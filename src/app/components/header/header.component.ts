import { Component, ElementRef, ViewChild } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  faMobileMenuIcon = faBars;
  @ViewChild('MobileMenu') mobileMenu: ElementRef;

  constructor(private element: ElementRef) {
    this.mobileMenu = this.element;
  }

  closeMobileMenu(): void {
    this.mobileMenu.nativeElement.style.display = 'none';
    this.element.nativeElement.parentNode.childNodes.forEach( (el:HTMLElement) => {
      if (el.localName !== 'app-header' && el.localName !== 'router-outlet'){
        if(el.style){
          el.style.display = 'block'
        }
      }
    })
  }

  openMobileMenu(): void {
    this.mobileMenu.nativeElement.style.display = 'block';
    this.element.nativeElement.parentNode.childNodes.forEach( (el:HTMLElement) => {
      if (el.localName !== 'app-header' && el.localName !== 'router-outlet'){
        if(el.style){
          el.style.display = 'none'
        }
      }
    })
  }

  isDashboard(): boolean {
    return window.location.href.indexOf('dashboard') > -1;
  }

}
