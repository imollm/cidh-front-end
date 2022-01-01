
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import jwt_decode from "jwt-decode"
import { IEvent } from '../event/models/event.model';


export interface ValidationResult {
  [key: string]: boolean;
}
  
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  static getMode(uri: string): string {
    let mode: string = 'create' || 'edit' || 'delete' || undefined;

    if (uri.includes('create')) {
      mode = 'create';
    } else if (uri.includes('edit')) {
      mode = 'edit';
    } else if (uri.includes('delete')) {
      mode = 'delete';
    }
    return mode;
  }

  static getResourceIdFromURI(uri: string): string {
    let id: string | undefined;

    if (uri.includes('edit') || uri.includes('view') || uri.includes('delete') || uri.includes('access')) {
      id = uri.split('/').slice(-1)[0];
      if (id.includes('#')) {
        id = uri.split('/').slice(-2)[0];
      }
    }

    return id;
  }


  static strong(control: FormControl): ValidationResult {
    let hasUpper = /[A-Z]/.test(control.value);
    let hasLower = /[a-z]/.test(control.value);
    
    const valid = hasUpper && hasLower;
    if (!valid) {
        // return what´s not valid
        return { strong: true };
    }
    return null;

  }

  static getRoleFromAccessToken(): string {
    const jwt: string = jwt_decode(sessionStorage.getItem("ACCESS_TOKEN"));
    return jwt['authorities'];
  }

  static humanitizeEpochDate(epochDate: any): any {
    if (epochDate) {
      return new Date(epochDate * 1000).toISOString().split('T')[0];
    }
    return null;
  }

  static convertDateToEpoch(humanDate: any): any {
    if (humanDate) {
      return new Date(humanDate).getTime() / 1000;
    }
    return null;
  }

  static getFullDate(date: any): any {
    if (date) {
      return date.toISOString().split('T')[0];
    }
    return null;
  }
}
