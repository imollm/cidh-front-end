import { Injectable } from '@angular/core';
import { IAdministratorService } from './administrator.interface';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService implements IAdministratorService {

  addAdministrator(email: string, password: string, name: string, surname: string): void {
    throw new Error('Method not implemented.');
  }
  updateAdministrator(email: string, password: string, name: string, surname: string): void {
    throw new Error('Method not implemented.');
  }
  showAdministrator(email: string): void {
    throw new Error('Method not implemented.');
  }
  listAllAdministrators(): void {
    throw new Error('Method not implemented.');
  }
  assignAdministratorToEventOrganizer(email: string, name: string): void {
    throw new Error('Method not implemented.');
  }
}
