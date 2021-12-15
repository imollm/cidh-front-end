import { IPermissions } from "./permissions.model";

export interface ILogin {
  jwt: string;
  refreshToken: string;
  tokenType: string;
  role: string;
  permissions: IPermissions;
}
