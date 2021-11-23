import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registration } from '../../models/registration';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private endpoint = '';

  constructor(private httpClient: HttpClient) { }

  send(data: Registration): Promise<any> {
    return this.httpClient.post(this.endpoint, data).toPromise();
  }
}
