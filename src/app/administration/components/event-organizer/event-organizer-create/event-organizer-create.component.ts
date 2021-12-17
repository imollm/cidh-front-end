import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventOrganizerService } from 'src/app/administration/services/event-organizer/event-organizer.service';
import { ModalResultService } from 'src/app/helpers/modal.service';

@Component({
  selector: 'app-event-organizer-create',
  templateUrl: './event-organizer-create.component.html',
  styleUrls: ['./event-organizer-create.component.sass']
})
export class EventOrganizerCreateComponent implements OnInit {

  title: string = 'Crear una nova empresa';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventOrganizerService: EventOrganizerService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalResultService: ModalResultService
  ) {
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

}
