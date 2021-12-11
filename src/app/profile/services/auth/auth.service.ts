import { Injectable } from '@angular/core';
import { IRegistration } from '../../models/registration.model';
import { IAuthService } from './auth.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EndPointMapper } from 'src/app/helpers/endpoint-mapper.helper.service';
import { ILogin } from '../../models/login.model';
import { IUser } from '../../models/user.model';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  private token: string | null | undefined;
  private refreshToken: string | null | undefined;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private endpointMapper: EndPointMapper,
    private spinner: NgxSpinnerService
    ) { }

  login(user: any): void {
    this.spinner.show();
    const endpoint = this.endpointMapper.getEndPointUrl('auth', 'login');
    this.httpClient.post<ILogin>(endpoint, user).toPromise().then(res => {
      if (res && res.jwt) {
        this.router.navigate(['/profile/dashboard']).then(() => {
          this.saveAccessToken(res.jwt);
          this.saveRefreshToken(res.refreshToken);
          this.spinner.hide();
        });
      }
    });;
  }

  logout(): Promise<void> {
    const endpoint = this.endpointMapper.getEndPointUrl('auth', 'invalidateToken');
    return this.httpClient.post(endpoint, this.getRefreshToken()).toPromise().then(() => {
      this.removeToken().then(() => {
        this.router.navigate(['/']);
      });
    });
  }

  registerUser(user: IRegistration): Promise<IRegistration> {
    const endpoint = this.endpointMapper.getEndPointUrl('user', 'create');
    return this.httpClient.post<IRegistration>(endpoint, user).toPromise();
  }

  getUser(): Promise<IUser> {
    const endpoint = this.endpointMapper.getEndPointUrl('user', 'me');
  return this.httpClient.get<IUser>(endpoint).toPromise();
  }

  private removeToken(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.token = '';
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('REFRESH_TOKEN');
      resolve(true);
    });
  }

  private saveAccessToken(token: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    this.token = token;
  }

  getAccessToken(): string {
    return this.token = localStorage.getItem('ACCESS_TOKEN');
  }

  isLogged(): boolean {
    return this.getAccessToken() !== null;
  }

  saveRefreshToken(refreshToken: string): void {
    localStorage.setItem('REFRESH_TOKEN', refreshToken);
    this.refreshToken = refreshToken;
  }

  getRefreshToken(): string {
    return this.refreshToken = localStorage.getItem('REFRESH_TOKEN');
  }
}
