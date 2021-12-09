import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/profile/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  formTitle = 'Inicia sessió';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: new FormControl('anyuseremail1@anyserver.com', Validators.required),
      password: new FormControl('Secure8DigitUpperCaseLowerCasePasswordWithNumbers', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(this.form.valid){
      this.authService.login(this.form.value).subscribe(res => {
        this.router.navigate(['profile/dashboard'])
      });
    }
  }

}
