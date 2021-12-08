import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAdministratorService } from './administrator.interface';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService implements IAdministratorService {

  constructor(private httpClient: HttpClient) {
  }

  addAdministrator(email: string, password: string, name: string, surname: string): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
  updateAdministrator(email: string, password: string, name: string, surname: string): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
  showAdministrator(email: string): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
  listAllAdministrators(): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
  assignAdministratorToEventOrganizer(email: string, name: string): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
}
