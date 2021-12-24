import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IRegistration } from 'src/app/profile/models/registration.model';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent {

  formTitle = 'Registre nou usuari';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
    ) {
    this.form = this.fb.group({
      firstName: new FormControl('Ivan', Validators.required),
      lastName: new FormControl('Moll', Validators.required),
      fiscalId: new FormControl('NOTVALIDATED', Validators.required),
      address: new FormControl('Some address', Validators.required),
      preferredLanguage: new FormControl('English', Validators.required),
      email: new FormControl('imollm@uoc.edu', [Validators.email, Validators.required]),
      password: new FormControl('Ciutadella1919!', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      let user: IRegistration = this.form.value;
      this.authService.registerUser(user).then(res => {
        this.spinner.show();
        if (res) {
          this.router.navigate(['/profile/login']);
        }
      }).then(() => {
        this.spinner.hide();
      });
    }
  }
}
