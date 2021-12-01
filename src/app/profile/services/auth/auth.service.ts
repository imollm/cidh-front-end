import { Injectable } from '@angular/core';
import { IRegistration } from '../../models/registration.model';
import { IAuthService } from './auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  private token: string | null | undefined;

  constructor() { }

  login(email: string, pwd: string): void {
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
