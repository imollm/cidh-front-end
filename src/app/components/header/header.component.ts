import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  faMobileMenuIcon = faBars;

  constructor() { }

  ngOnInit(): void {
  }

  closeMobileMenu(): void {

  }

}
