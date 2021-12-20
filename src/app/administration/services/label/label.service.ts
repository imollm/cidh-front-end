import { Injectable } from '@angular/core';
import { Label } from '../../models/label.model';
import { ILabelService } from './label.interface';
import * as faker from 'faker';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LabelService implements ILabelService {

  constructor(private httpClient: HttpClient) {

  }
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
  listAllLabels(): Label[] {
    TODO: 'Method not implemented.'
    let labels: Label[] = [];
    for (let i = 0; i < 10; i++) {
      labels.push({
        id: faker.datatype.uuid(),
        name: faker.lorem.word(),
        description: faker.lorem.words()
      });
    }
    return labels;
  }
  removeLabel(name: string): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
}
