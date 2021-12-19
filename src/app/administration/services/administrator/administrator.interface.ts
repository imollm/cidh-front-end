export interface IAdministratorService {
  addAdministrator(email: string, password: string, name: string, surname: string): void;
  updateAdministrator(email: string, password: string, name: string, surname: string): void;
  showAdministrator(email: string): void;
  listAllAdministrators(): void;
  assignAdministratorToEventOrganizer(email: string, name: string): void;
}
