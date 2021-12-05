import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventSearcherService } from '../../services/event-searcher.service';
import { EventSearcher as EventSearcherModel } from '../../models/event-searcher.model';
import { EventService } from 'src/app/event/services/event.service';

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
    private router: Router,
    private eventService: EventService
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
    let searchModel: EventSearcherModel = {} as EventSearcherModel;
    searchModel.name = this.form.get('name').value;
    searchModel.labelId = this.form.get('labelId').value;
    TODO: "Get label name from option"
    searchModel.labelName = 'Label Name';
    this.router.navigate(['/search']).then(() => {
      searchModel.events = this.eventService.findEvents(searchModel);
      this.messageService.changeMessage(searchModel);
    });
  }
}
