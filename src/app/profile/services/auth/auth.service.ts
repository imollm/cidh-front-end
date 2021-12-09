import { Injectable } from '@angular/core';
import { IRegistration } from '../../models/registration.model';
import { IAuthService } from './auth.interface';
import { Observable } from 'rxjs';
import { IAuth } from 'src/app/api/auth.model';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  private token: string | null | undefined;

  constructor(
    private httpClient: HttpClient,
    private router: Router
    ) { }

  login(user: any): Observable<IAuth> {
    return this.httpClient.post<IAuth>('http://localhost:8080/users/login',
      user).pipe(tap(
      (res: IAuth) => {
        if (res) {
          this.saveToken(res.jwt);
          this.router.navigate(['profile/dashboard']);
        }
      }
    ));
  }

  logout(): void {
  }

  registerUser(user: IRegistration): void {
  }

  private removeToken(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.token = '';
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('EXPIRES_IN');
      resolve(true);
    });
  }

  private saveToken(token: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    // localStorage.setItem('EXPIRES_IN', expiresIn);
    this.token = token;
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }
    return this.token as string;
  }

  isLogged(): boolean {
    return this.getToken() !== null;
  }
}
