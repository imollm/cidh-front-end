import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventOrganizer } from 'src/app/administration/models/event-organizer.model';
import { EventOrganizerService } from 'src/app/administration/services/event-organizer/event-organizer.service';
import { ModalResultService } from 'src/app/helpers/modal.service';
import { UtilsService } from 'src/app/helpers/utils.helper.service';
import { IUser } from 'src/app/profile/models/user.model';
import { AuthService } from 'src/app/profile/services/auth/auth.service';

@Component({
  selector: 'app-event-organizer-create-edit',
  templateUrl: './event-organizer-create-edit.component.html',
  styleUrls: ['./event-organizer-create-edit.component.sass']
})
export class EventOrganizerCreateEditComponent {

  title: string = 'Crear una nova empresa';
  form: FormGroup;
  meAsSuperAdmin: IUser;
  mode: string;
  eventOrganizer: EventOrganizer;

  constructor(
    private fb: FormBuilder,
    private eventOrganizerService: EventOrganizerService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalResultService: ModalResultService,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      admin: new FormControl('')
    });
  }

  ngOnInit(): void {
    let mode = UtilsService.getMode(this.router.url); 

    if (!mode && mode === 'create') {
      this.createMode()
    } else if (!mode && mode === 'edit') {
      this.editMode();
    } else {
      this.router.navigate(['/administration/dashboard/event-organizer/list']);
    }
  }

  createMode(): void {
    this.getUser();
    this.form.reset();
  }

  editMode(): void {
    this.eventOrganizer.id = UtilsService.getResourceIdFromURI(this.router.url);
    this.eventOrganizer.id 
      ? this.getEventOrganizer(this.eventOrganizer)
      : this.router.navigate(['/administration/dashboard/event-organizer/list']);
  }

  getUser(): void {
    this.authService.getUser().then(res => {
      if (res) {
        this.form.get('admin').setValue(res.id);
      }
    });
  }

  
  getEventOrganizer(eventOrganizer: EventOrganizer): void {
    this.eventOrganizerService.showEventOrganizer(eventOrganizer.id).then(res => {
      this.spinner.show();
      if (res) {
        this.eventOrganizer = res;

        this.form.patchValue({
          id: this.eventOrganizer.id,
          name: this.eventOrganizer.name,
          description: this.eventOrganizer.description,
          admin: this.eventOrganizer.admin
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.spinner.show();
      this.eventOrganizerService.addEventOrganizer(this.form.value).then(res => {
        if (res) {
          this.router.navigate(['/administration/dashboard/event-organizer/list']).then(() => {
            this.modalResultService.createResultModal(true);
          });
        } else {
          this.modalResultService.createResultModal(false);
        }
      }).then(() => this.spinner.hide());
    }
  }
}
