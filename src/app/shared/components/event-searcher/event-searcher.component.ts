import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventSearcherService } from '../../services/event-searcher.service';
import { EventSearcher as EventSearcherModel } from '../../models/event-searcher.model';

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
      labelId: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // When user click on submit button, this component uses the EventSearcherService
    // to send the search params to EventResultsComponent
    let searchParams: EventSearcherModel = {} as EventSearcherModel;
    searchParams.name = this.form.get('name').value;
    searchParams.labelId = this.form.get('labelId').value;
    TODO: "Get label name from option"
    searchParams.labelName = 'Label Name';
    this.messageService.changeMessage(searchParams);
    this.router.navigate(['/search']);
  }
}
