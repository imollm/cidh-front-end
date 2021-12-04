import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-link-admin-to-event',
  templateUrl: './link-admin-to-event.component.html',
  styleUrls: ['./link-admin-to-event.component.sass']
})
export class LinkAdminToEventComponent implements OnInit {

  formTitle: string = 'Associa un admin. a un acte';

  constructor() { }

  ngOnInit(): void {
  }

  changeColor(event : Event): void {
    let select = (event.target as HTMLSelectElement);
    if (select.getAttribute('data-selected') === 'false') {
      select.style.color = '#161925';
      select.style.fontStyle = 'normal';
      select.style.fontWeight = 'normal';
      select.setAttribute('data-selected', 'true');
    }
  }

}
