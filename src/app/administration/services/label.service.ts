import { Injectable } from '@angular/core';
import { ILabelService } from './label.interface';

@Injectable({
  providedIn: 'root'
})
export class LabelService implements ILabelService {

  constructor() { }
  addLabel(name: string, description: string): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
  updateLabel(name: string, description: string): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
  showLabel(name: string): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
  listAllLabels(): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
  removeLabel(name: string): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
}
