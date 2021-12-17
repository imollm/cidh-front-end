import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/profile/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  formTitle = 'Inicia sessió';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.spinner.show();
      this.authService.login(this.form.value).then(res => {
        if (res && res.jwt) {
          this.authService.saveAccessToken(res.jwt);
          this.authService.saveRefreshToken(res.refreshToken);
          this.authService.changeMessage(res);
          this.spinner.hide();
          this.router.navigate(['/profile/dashboard']);
        }
      });
    }
  }

}
