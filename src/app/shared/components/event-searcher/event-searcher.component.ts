import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-event-searcher',
  templateUrl: './event-searcher.component.html',
  styleUrls: ['./event-searcher.component.sass']
})
export class EventSearcherComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: new FormControl(''),
      label: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
  }

}
