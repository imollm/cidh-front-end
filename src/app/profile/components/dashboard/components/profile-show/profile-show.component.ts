import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Userprofile } from 'src/app/profile/models/userprofile';
import * as faker from "faker";

@Component({
  selector: 'app-profile-show',
  templateUrl: './profile-show.component.html',
  styleUrls: ['./profile-show.component.sass']
})
export class ProfileShowComponent implements OnInit {

  formTitle = 'Modifica les teves dades';
  form: FormGroup;
  user: Userprofile;

  
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
    
    this.user = this.initUser();


  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.valid) {
      //let data: Registration = this.form.value;
      //this.signUpService.send(data).then(res => {
      //}
      //);
    }
  }

  private initUser():Userprofile {
    let user = {} as Userprofile;
    user.name=faker.name.firstName();
    user.surname=faker.name.lastName();
    user.address=faker.address.direction();
    user.fiscalId=faker.datatype.uuid();
    user.language="español";
    user.email=faker.internet.email();
    user.password=faker.internet.password();
    return user;
  }
}
