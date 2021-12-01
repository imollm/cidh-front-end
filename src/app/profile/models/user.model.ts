import { IPermissions } from "./permissions.model";

export interface IUser {
    name: string;
    surname: string;
    fiscalId: string;
    address: string;
    language: string;
    email: string;
    password: string;
    role: string;
    permissions: IPermissions;
}
