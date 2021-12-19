import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventSearcherService } from '../../services/event-searcher.service';
import { EventSearcher as EventSearcherModel } from '../../models/event-searcher.model';
import { EventService } from 'src/app/event/services/event.service';
import { Label } from 'src/app/administration/models/label.model';
import { LabelService } from 'src/app/administration/services/label/label.service';

@Component({
  selector: 'app-event-searcher',
  templateUrl: './event-searcher.component.html',
  styleUrls: ['./event-searcher.component.sass']
})
export class EventSearcherComponent implements OnInit {

  form: FormGroup;
  labels: Label[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: EventSearcherService, //Service to send search params to EventResultsComponent
    private router: Router,
    private eventService: EventService,
    private labelService: LabelService
  ) {
    this.form = this.fb.group({
      name: new FormControl(''),
      label: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getLabels();
  }

  getLabels(): void {
    this.labels = this.labelService.listAllLabels();
  }

  onSubmit(): void {
    // When user click on submit button, this component do this things:
    // 1. Get the search params from the form
    // 2. Send the search params to the EventResultsComponent
    // 3. Redirect the user to the EventResultsComponent
    this.router.navigate(['/results']).then(() => {
      let searchModel: EventSearcherModel = {} as EventSearcherModel;
      searchModel = this.form.value;
      searchModel.events = this.eventService.findEvents(searchModel);
      this.messageService.changeMessage(searchModel);
    });
  }
}
