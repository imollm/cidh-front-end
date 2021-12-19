import { Injectable } from '@angular/core';
import { IRegistration } from '../../models/registration.model';
import { IAuthService } from './auth.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EndPointMapper } from 'src/app/helpers/endpoint-mapper.helper.service';
import { ILogin } from '../../models/login.model';
import { IUser } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { ILogout } from '../../components/dashboard/components/logout/logout.model';

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
    const payload: ILogout = {
      refreshToken: this.getRefreshToken()
    };
    return this.httpClient.post<ILogout>(endpoint, payload).toPromise().then(() => {
      this.removeTokens();
      this.router.navigate(['/']);
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

  removeTokens(): void {
    sessionStorage.removeItem('ACCESS_TOKEN');
    sessionStorage.removeItem('REFRESH_TOKEN');
  }

  saveAccessToken(token: string): void {
    sessionStorage.setItem('ACCESS_TOKEN', token);
    this.token = token;
  }

  getAccessToken(): string {
    return this.token = sessionStorage.getItem('ACCESS_TOKEN');
  }

  isLogged(): boolean {
    return this.getAccessToken() !== null;
  }

  saveRefreshToken(refreshToken: string): void {
    sessionStorage.setItem('REFRESH_TOKEN', refreshToken);
    this.refreshToken = refreshToken;
  }

  getRefreshToken(): string {
    return this.refreshToken = sessionStorage.getItem('REFRESH_TOKEN');
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
