import { IUser } from "src/app/profile/models/user.model";

export interface IAdministratorService {
  addAdministrator(email: string, password: string, name: string, surname: string): void;
  updateAdministrator(email: string, password: string, name: string, surname: string): void;
  showAdministrator(adminId: string): Promise<IUser>;
  listAllAdministrators(): Promise<IUser[]>;
  assignAdministratorToEventOrganizer(email: string, name: string): void;
}
