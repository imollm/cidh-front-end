import { IUser } from '../profile/models/user.model';

export interface IAuth {
  token: string;
  user: IUser;
}
