import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.sass']
})
export class SearcherComponent implements OnInit {

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
