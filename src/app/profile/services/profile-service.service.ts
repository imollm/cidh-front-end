import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user.model'
import { EndPointMapper } from 'src/app/helpers/endpoint-mapper.helper.service';
import { IProfileService } from './profile-service.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements IProfileService {

  constructor(
    private httpClient: HttpClient,
    private endPointMapper: EndPointMapper
  ) { }

   showUser(): Promise<IUser> {
     const endpoint = this.endPointMapper.getEndPointUrl('user', 'me')
     return this.httpClient.get<IUser>(endpoint).toPromise();
   }

   
   updateUser(user: IUser): Promise<IUser> {
    const endpoint = this.endPointMapper.getEndPointUrl('user', 'updateMe')
    return this.httpClient.post<IUser>(endpoint, user).toPromise()
   }
}
