import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventOrganizerService } from 'src/app/administration/services/event-organizer/event-organizer.service';
import { ModalResultService } from 'src/app/helpers/modal.service';
import { IUser } from 'src/app/profile/models/user.model';
import { AuthService } from 'src/app/profile/services/auth/auth.service';

@Component({
  selector: 'app-event-organizer-create',
  templateUrl: './event-organizer-create.component.html',
  styleUrls: ['./event-organizer-create.component.sass']
})
export class EventOrganizerCreateComponent {

  title: string = 'Crear una nova empresa';
  form: FormGroup;
  meAsSuperAdmin: IUser;

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
    this.authService.getUser().then(res => {
      if (res) {
        this.form.get('admin').setValue(res.id);
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
