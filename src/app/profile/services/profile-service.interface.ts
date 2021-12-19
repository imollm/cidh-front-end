import { IUser } from "../models/user.model";

export interface IProfileService{
    showUser(): void;
    updateUser(user: IUser):Promise<any>
}