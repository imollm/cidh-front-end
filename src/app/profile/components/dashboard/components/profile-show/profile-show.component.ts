import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalResultService } from 'src/app/helpers/modal.service';
import { ProfileService } from '../../../../services/profile-service.service'


@Component({
  selector: 'app-profile-show',
  templateUrl: './profile-show.component.html',
  styleUrls: ['./profile-show.component.sass']
})
export class ProfileShowComponent implements OnInit {

  formTitle = 'Modifica les teves dades';
  form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private modalResultService: ModalResultService,
    private spinner: NgxSpinnerService
  ) {
    this.form = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      fiscalId: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      preferredLanguage: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getUser()
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.spinner.show();
      this.profileService.updateUser(this.form.value).then(res => {
        if (res) {
          this.spinner.hide();
          this.modalResultService.editResultModal(res);
          this.form.reset();
          this.getUser();
        }
      });
    }
  }

  getUser(): void {
    this.spinner.show();
    this.profileService.showUser().then(user => {
      Object.keys(this.form.value).forEach(key => {
        this.form.get(key).setValue(user[key]);
      });
    }).then(() => {
      this.spinner.hide();
    });
  }
}
