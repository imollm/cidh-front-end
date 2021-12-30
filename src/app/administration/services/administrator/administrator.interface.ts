import { IUser } from "src/app/profile/models/user.model";

export interface IAdministratorService {
  addAdministrator(admin: IUser): Promise<IUser>;
  updateAdministrator(adminId: string, admin: IUser): Promise<IUser>;
  showAdministrator(adminId: string): Promise<IUser>;
  listAllAdministrators(): Promise<IUser[]>;
}
