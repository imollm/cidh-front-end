import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Registration } from 'src/app/profile/models/registration';
import { SignupService } from 'src/app/profile/services/auth/signup.service';

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
    private signUpService: SignupService
    ) {
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      fiscalId: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      let data: Registration = this.form.value;
      this.signUpService.send(data).then(res => {

      });
    }
  }

}
