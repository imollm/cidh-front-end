import { IPermissions } from "./permissions.model";

export interface IUser {
    id?: string;
    firstName: string;
    lastName: string;
    fiscalId: string;
    address: string;
    preferredLanguage: string;
    email: string;
    password?: string;
    role: string;
    permissions?: IPermissions
}
