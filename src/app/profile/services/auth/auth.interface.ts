import { ILogin } from '../../models/login.model';
import { IRegistration } from '../../models/registration.model';

export interface IAuthService {
    login(email: string, pwd: string): Promise<ILogin>;
    logout(): Promise<void>;
    registerUser(user: IRegistration): Promise<IRegistration>;
}
