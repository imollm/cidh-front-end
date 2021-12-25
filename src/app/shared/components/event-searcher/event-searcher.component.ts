import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EventSearcherService } from '../../services/event-searcher.service';
import { EventSearcher as EventSearcherModel } from '../../models/event-searcher.model';
import { EventService } from 'src/app/event/services/event.service';
import { Label } from 'src/app/administration/models/label.model';
import { LabelService } from 'src/app/administration/services/label/label.service';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/administration/models/category.model';
import { CategoryService } from 'src/app/administration/services/category/category.service';
import { IEvent } from 'src/app/event/models/event.model';

@Component({
  selector: 'app-event-searcher',
  templateUrl: './event-searcher.component.html',
  styleUrls: ['./event-searcher.component.sass']
})
export class EventSearcherComponent implements OnInit, OnDestroy {

  form: FormGroup;
  labels: Label[] = [];
  categories: Category[] = [];
  subscription: Subscription;
  searchParams: EventSearcherModel = {} as EventSearcherModel;
  events: IEvent[] = [];
  actualPage: number = 1;

  constructor(
    private fb: FormBuilder,
    private messageService: EventSearcherService, //Service to send search params to EventResultsComponent
    private eventService: EventService,
    private labelService: LabelService,
    private categoryService: CategoryService
  ) {
    this.form = this.fb.group({
      name: new FormControl(''),
      label: new FormControl(''),
      category: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.subscription = this.messageService.currentMessage.subscribe(message => this.searchParams = message);
    this.getLabels();
    this.getCategories();
  }

  getLabels(): void {
    this.labelService.listAllLabels().then(res => {
      if (res && res.length > 0) {
        this.labels = res;
      }
    }).catch(err => console.log(err));
  }

  getCategories(): void {
    this.categoryService.listAllCategories().then(res => {
      if (res && res.length > 0) {
        this.categories = res;
      }
    }).catch(err => console.log(err));
  }

  onSubmit(): void {
    this.resetSearchParams();
    this.setSearchParams();
    this.eventService.findEvents(this.searchParams).then(res => {
      this.searchParams.events = res;
    }).then(() => {
      this.form.reset();
    }).catch(err => console.log(err));
  }

  setSearchParams(): void {
    if (this.form.get('name').value) {
      this.searchParams.name = this.form.get('name').value.split(',');
    }
    if (this.form.get('label').value) {
      this.searchParams.label = [];
      this.searchParams.label.push(this.form.get('label').value.name);
    }
    if (this.form.get('category').value) {
      this.searchParams.category = [];
      this.searchParams.category.push(this.form.get('category').value.name);
    }
  }

  resetSearchParams(): void {
    Object.keys(this.searchParams).map(key => {
      if (this.searchParams[key] && this.searchParams[key].length > 0) {
        this.searchParams[key] = [];
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
