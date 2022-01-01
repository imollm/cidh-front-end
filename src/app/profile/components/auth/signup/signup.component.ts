import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from 'src/app/helpers/utils.helper.service';
import { IRegistration } from 'src/app/profile/models/registration.model';
import { AuthService } from '../../../services/auth/auth.service';
import { preferredLanguages } from 'src/app/profile/models/preferredLanguages.model';
import { ModalResultService } from 'src/app/helpers/modal.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent {

  formTitle = 'Registre nou usuari';
  form: FormGroup;
  languages = preferredLanguages;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalResultService: ModalResultService
    ) {
    this.form = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      fiscalId: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      preferredLanguage: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password1: new FormControl('', [UtilsService.strong, Validators.minLength(8)]),
      password2: new FormControl('', [UtilsService.strong, Validators.minLength(8)])
    });
  }

  onSubmit(): void {
    if (this.form.valid && this.isPwdEquals()) {
      this.setPassword();
      let user: IRegistration = this.form.value;

      this.authService.registerUser(user).then(res => {
        this.spinner.show();
        if (res) {
          this.router.navigate(['/profile/login']).then(() => {
            this.modalResultService.signUpSuccessResult(user);
          });
        }
      }).then(() => {
        this.spinner.hide();
      }).catch(err => {
        this.modalResultService.signUpErrorResult();
      });
    }
  }

  isPwdEquals(): boolean {
    return this.form.get('password1').value === this.form.get('password2').value;
  }

  setPassword(): void {
    const pwd = this.form.value.password1;

    delete this.form.value.password1;
    delete this.form.value.password2;

    this.form.value.password = pwd;
  }
}
