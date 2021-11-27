import { Permissions } from "./permissions";

export interface User {
    role: string;
    permissions: Permissions;
}
