import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private profileService: ProfileService
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

  ngOnInit(): void {
    this.getUser();
  }

  onSubmit(): void {
    if (this.form.valid) {
      //let data: Registration = this.form.value;
      //this.signUpService.send(data).then(res => {
      //}
      //);
    }
  }

  getUser(): void {
    this.profileService.showUser().then(res => {
      console.log(res)
    })
  }


}