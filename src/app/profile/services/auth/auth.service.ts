import { Injectable } from '@angular/core';
import { Registration } from '../../models/registration';
import { IAuthService } from './auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  constructor() { }
  login(email: string, pwd: string): void {
  }
  logout(): void {
  }
  registerUser(user: Registration): void {
  }
}
