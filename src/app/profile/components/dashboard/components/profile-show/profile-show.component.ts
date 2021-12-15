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
    private profileService: ProfileService,
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
      if(window.confirm('Estas segur de que vols cambiar les teves dades personals?')){
        this.profileService.updateUser(this.form.value).then(res => {
          if(!res.error){
            window.alert('Dades modificades!')
          }
        })
      }
    }
  }

  getUser(): void {
    this.profileService.showUser().then(user => {
        Object.keys(this.form.value).forEach(key => {
        this.form.get(key).setValue(user[key])
      })
    })
  }
}
