
import { Injectable } from '@angular/core';
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

<<<<<<< HEAD
    if (uri.includes('edit') || uri.includes('delete')) {
=======
    if (uri.includes('edit') || uri.includes('view')) {
>>>>>>> develop
      id = uri.split('/').slice(-1)[0];
      if (id.includes('#')) {
        id = uri.split('/').slice(-2)[0];
      }
    }

    return id;
  }
}
