import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-show',
  templateUrl: './profile-show.component.html',
  styleUrls: ['./profile-show.component.sass']
})
export class ProfileShowComponent {

  formTitle = 'Modifica les teves dades';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    //private signUpService: SignupService
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
      //let data: Registration = this.form.value;
      //this.signUpService.send(data).then(res => {
      //}
      //);
    }
  }


}
