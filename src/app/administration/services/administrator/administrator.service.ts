import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndPointMapper } from 'src/app/helpers/endpoint-mapper.helper.service';
import { IUser } from 'src/app/profile/models/user.model';
import { IAdministratorService } from './administrator.interface';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService implements IAdministratorService {

  constructor(
    private httpClient: HttpClient,
    private endpointMapper: EndPointMapper
  ) {
  }

  addAdministrator(admin: IUser): Promise<IUser> {
    const endpoint = this.endpointMapper.getEndPointUrl("user", "create");
    return this.httpClient.post<IUser>(endpoint, admin).toPromise();
  }

  updateAdministrator(adminId: string, admin: IUser): Promise<IUser> {
    const endpoint = this.endpointMapper.getEndPointUrl("user", "updateById", adminId);
    return this.httpClient.post<IUser>(endpoint, admin).toPromise();
  }

  showAdministrator(adminId: string): Promise<IUser> {
    const endpoint = this.endpointMapper.getEndPointUrl('user', 'getById', adminId);
    return this.httpClient.get<IUser>(endpoint).toPromise();
  }

  listAllAdministrators(): Promise<IUser[]> {
    const endpoint = this.endpointMapper.getEndPointUrl('user', 'getAdmins');
    return this.httpClient.get<IUser[]>(endpoint).toPromise();
  }
}
