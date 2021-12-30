
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import jwt_decode from "jwt-decode"


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

    if (uri.includes('edit') || uri.includes('view') || uri.includes('delete')) {
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
}
