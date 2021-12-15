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
    firstName: '',
    lastName: '',
    fiscalId: '',
    address: '',
    preferredLanguage: '',
    email: '',
    password: ''
  }

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    //private signUpService: SignupService
    ) {
    this.form = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      fiscalId: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      preferredLanguage: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      //password: new FormControl('', )
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  onSubmit(): void {
    if (this.form.valid) {
      if(window.confirm('Estas segur de que vols cambiar les teves dades personals?')){
        this.profileService.updateUser(this.form.value).then(res => {
          if(!res.error){
            window.alert('Dades modificades!')
          }
        })
      }
      //let data: Registration = this.form.value;
      //this.signUpService.send(data).then(res => {
      //}
      //);
    }
  }

  getUser(): void {
    this.profileService.showUser().then(res => {
      this.user.firstName = res.firstName
      this.user.lastName = res.lastName
      this.user.fiscalId = res.fiscalId
      this.user.address = res.address
      this.user.preferredLanguage = res.preferredLanguage
      this.user.email = res.email
      this.setValues(this.user)

    })
  }

  setValues(user: Userprofile): void {
    Object.keys(this.form.value).forEach(key => {
      this.form.get(key).setValue(user[key])
    })
  }


}
