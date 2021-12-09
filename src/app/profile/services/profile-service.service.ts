import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Userprofile } from '../models/userprofile'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) {
   
   }

   showUser(): Promise<any> {
     const endpoint = 'http://localhost:8080/users/me'
     return this.httpClient.get(endpoint).toPromise();
   }
}