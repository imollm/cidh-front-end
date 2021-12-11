import { Injectable } from '@angular/core';
import { IRegistration } from '../../models/registration.model';
import { IAuthService } from './auth.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EndPointMapper } from 'src/app/helpers/endpoint-mapper.helper.service';
import { ILogin } from '../../models/login.model';
import { IUser } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  private token: string | null | undefined;
  private refreshToken: string | null | undefined;

  private message: ILogin = {} as ILogin;
  private messageSource = new BehaviorSubject<ILogin>(this.message);
  currentMessage = this.messageSource.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private endpointMapper: EndPointMapper,
    ) { }

  login(user: any): Promise<ILogin> {
    const endpoint = this.endpointMapper.getEndPointUrl('auth', 'login');
    return this.httpClient.post<ILogin>(endpoint, user).toPromise();
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

  removeToken(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.token = '';
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('REFRESH_TOKEN');
      resolve(true);
    });
  }

  saveAccessToken(token: string): void {
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

  /**
   * Method to send ILogin to subscribers
   * (Subscriber) DashboardComponent
   *
  */
  changeMessage(message: ILogin) {
    this.messageSource.next(message);
  }
}
