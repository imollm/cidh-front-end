import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  static getMode(uri: string): string {
    let mode: string = 'create' || 'edit' || undefined;

    if (uri.includes('create')) {
      mode = 'create';
    } else if (uri.includes('edit')) {
      mode = 'edit';
    }
    return mode;
  }

  static getResourceIdFromURI(uri: string): string {
    let id: string | undefined;

    if (uri.includes('edit')) {
      id = uri.split('/').slice(-1)[0];
      if (id.includes('#')) {
        id = uri.split('/').slice(-2)[0];
      }
    }

    return id;
  }

  static getRoleFromAccessToken(): string {
    const jwt: string = jwt_decode(sessionStorage.getItem("ACCESS_TOKEN"));
    return jwt['authorities'];
  }
}
