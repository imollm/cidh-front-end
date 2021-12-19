import { Component } from '@angular/core';

@Component({
  selector: 'app-link-admin-to-event-organizer',
  templateUrl: './link-admin-to-event-organizer.component.html',
  styleUrls: ['./link-admin-to-event-organizer.component.sass']
})
export class LinkAdminToEventOrganizerComponent {

  formTitle: string = 'Associa un admin. a una empresa';

  constructor() { }

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
