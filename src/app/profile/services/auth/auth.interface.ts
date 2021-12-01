import { IRegistration } from '../../models/registration.model';

export interface IAuthService {
    login(email: string, pwd: string): void;
    logout(): void;
    registerUser(user: IRegistration): void;
}
