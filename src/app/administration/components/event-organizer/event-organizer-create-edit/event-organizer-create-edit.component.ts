import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IEventOrganizer } from 'src/app/administration/models/event-organizer.model';
import { AdministratorService } from 'src/app/administration/services/administrator/administrator.service';
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
export class EventOrganizerCreateEditComponent implements OnInit {

  title: string = 'Crear una nova empresa';
  btnText: string = 'Crear';
  form: FormGroup;
  mode: string;
  eventOrganizerId: string;
  eventOrganizer: IEventOrganizer = {} as IEventOrganizer;
  administrators: IUser[] = [];

  constructor(
    private fb: FormBuilder,
    private eventOrganizerService: EventOrganizerService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalResultService: ModalResultService,
    private adminService: AdministratorService
  ) {
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      admin: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.mode = UtilsService.getMode(this.router.url); 

    if (this.mode && this.mode === 'create') {
      this.createMode();
    } else if (this.mode && this.mode === 'edit') {
      this.editMode();
      this.title = 'Edita la empresa';
      this.btnText = 'Edita';
    }

    this.getAdministrators();
  }

  createMode(): void {
    this.form.reset();
  }

  editMode(): void {
    this.eventOrganizerId = UtilsService.getResourceIdFromURI(this.router.url);
    this.eventOrganizerId 
      ? this.getEventOrganizer()
      : this.router.navigate(['/administration/dashboard/event-organizer/list']);
  }
  
  getEventOrganizer(): void {
    this.eventOrganizerService.showEventOrganizer(this.eventOrganizerId).then(res => {
      this.spinner.show();
      console.log(res);
      if (res) {
        this.eventOrganizer = res;
        this.eventOrganizerId = this.eventOrganizer.id;
        this.form.patchValue({
          name: this.eventOrganizer.name,
          description: this.eventOrganizer.description,
          admin: this.eventOrganizer.admin
        });
      }
      this.spinner.hide();
    });
  }

  getAdministrators(): void {
    this.adminService.listAllAdministrators().then(res => {
      if (res && res.length > 0) {
        this.administrators = res;
      }
    }).catch(err => console.log(err));
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.spinner.show();

      if (this.mode && this.mode === 'create') {
        this.eventOrganizerService.addEventOrganizer(this.form.value).then(res => {
          this.eventOrganizer = res;
        }).then(() => this.redirectUser());
      } else if (this.mode && this.mode === 'edit') {
        this.eventOrganizerService.updateEventOrganizer(this.eventOrganizerId, this.form.value).then(res => {
          this.eventOrganizer = res;
        }).then(() => this.redirectUser());
      }
    }
  }

  // Redirect user on list component and show modal with result
  redirectUser(): void {
    this.router.navigate(['/administration/dashboard/event-organizer/list']).then(() => {
      let result: Boolean = this.eventOrganizer.hasOwnProperty('id');

      if (this.mode === 'create') {
        this.modalResultService.createResultModal(result);
      } else if (this.mode === 'edit') {
        this.modalResultService.editResultModal(result);
      }
    }).then(() => this.spinner.hide());
  }
}
