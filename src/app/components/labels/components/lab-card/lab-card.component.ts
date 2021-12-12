import { Component, Input } from '@angular/core';
import { Label } from 'src/app/administration/models/label.model';

@Component({
  selector: 'app-lab-card',
  templateUrl: './lab-card.component.html',
  styleUrls: ['./lab-card.component.sass']
})
export class LabCardComponent {

  @Input() label: Label;

  constructor() { }

}
