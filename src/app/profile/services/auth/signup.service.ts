import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRegistration } from '../../models/registration.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private endpoint = '';

  constructor(private httpClient: HttpClient) { }

  send(data: IRegistration): Promise<any> {
    return this.httpClient.post(this.endpoint, data).toPromise();
  }
}
