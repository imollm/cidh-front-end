import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.sass']
})
export class PageNotFoundComponent  {
  title = 'Pàgina no trobada';
  subTitle = "Mentre esperes ves a buscar un Häagen Dazs"

  constructor() { }
 
}
