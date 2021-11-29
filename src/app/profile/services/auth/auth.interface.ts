import { Registration } from '../../models/registration';

export interface IAuthService {
    login(email: string, pwd: string): void;
    logout(): void;
    registerUser(user: Registration): void;
}
