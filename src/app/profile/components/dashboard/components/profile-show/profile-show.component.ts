import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Userprofile } from 'src/app/profile/models/userprofile';
import { ProfileService } from '../../../../services/profile-service.service'

@Component({
  selector: 'app-profile-show',
  templateUrl: './profile-show.component.html',
  styleUrls: ['./profile-show.component.sass']
})
export class ProfileShowComponent implements OnInit {

  formTitle = 'Modifica les teves dades';
  form: FormGroup;
  user: Userprofile = {
    name: '',
    surname: '',
    fiscalId: '',
    address: '',
    language: '',
    email: '',
    password: ''
  }

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
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
      this.user.name = res.firstName
      this.user.surname = res.lastName
      this.user.fiscalId = res.fiscalId
      this.user.address = res.address
      this.user.language = res.preferredLanguage
      this.user.email = res.email
      this.setValues(this.user)

    })
  }

  setValues(user: Userprofile): void {
    Object.keys(user).forEach(key => {
      this.form.get(key).setValue(user[key])
    })
  }


}
