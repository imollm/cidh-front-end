import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user.model'
import { EndPointMapper } from 'src/app/helpers/endpoint-mapper.helper.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient, private endPointMapper: EndPointMapper) {
   
   }

   showUser(): Promise<any> {
     const endpoint = this.endPointMapper.getEndPointUrl('user', 'me')
     return this.httpClient.get(endpoint).toPromise();
   }

   
   updateUser(user: IUser): Promise<any> {
    const endpoint = this.endPointMapper.getEndPointUrl('user', 'updateMe')
    return this.httpClient.post(endpoint, user).toPromise()
   }
}