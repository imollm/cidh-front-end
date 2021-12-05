import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventSearcherService } from '../../services/event-searcher.service';

@Component({
  selector: 'app-event-searcher',
  templateUrl: './event-searcher.component.html',
  styleUrls: ['./event-searcher.component.sass']
})
export class EventSearcherComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: EventSearcherService, //Service to send search params to EventResultsComponent
    private router: Router
  ) {
    this.form = this.fb.group({
      name: new FormControl(''),
      label: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // When user click on submit button, this component uses the EventSearcherService
    // to send the search params to EventResultsComponent
    this.messageService.changeMessage(this.form.value);
    this.router.navigate(['/search']);
  }
}
