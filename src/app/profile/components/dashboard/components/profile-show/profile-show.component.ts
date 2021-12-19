import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalResultService } from 'src/app/helpers/modal.service';
import { ProfileService } from '../../../../services/profile-service.service'
import { preferredLanguages } from 'src/app/profile/models/preferredLanguages.model';


@Component({
  selector: 'app-profile-show',
  templateUrl: './profile-show.component.html',
  styleUrls: ['./profile-show.component.sass']
})
export class ProfileShowComponent implements OnInit {

  formTitle = 'Modifica les teves dades';
  form: FormGroup;
  selectLanguages = preferredLanguages;


  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private modalResultService: ModalResultService,
    private spinner: NgxSpinnerService,
    private router: Router
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

  getUser(): void {
    this.spinner.show();
    this.profileService.showUser().then(user => {
      this.form.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        fiscalId: user.fiscalId,
        address: user.address,
        preferredLanguage: user.preferredLanguage,
        email: user.email
      });
    }).then(() => {
      this.spinner.hide();
    });
  }

  onSubmit(): void {
    let result: Boolean;

    if (this.form.valid) {
      this.spinner.show();
      this.profileService.updateUser(this.form.value).then(res => {
        result = res.hasOwnProperty('id');
      }).then(() => {
        this.router.navigate(['/profile/dashboard/home']).then(() => {
          this.modalResultService.editResultModal(result);
          this.spinner.hide();
        });
      });
    }
  }
}
