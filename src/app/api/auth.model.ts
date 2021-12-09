import { IPermissions } from '../profile/models/permissions.model';
import { IUser } from '../profile/models/user.model';

export interface IAuth {
  jwt: string;
  refreshToken: string;
  tokenType: string;
  role: string;
  permissions: IPermissions;
  
}
