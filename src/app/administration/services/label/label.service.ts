import { Injectable } from '@angular/core';
import { Label } from '../../models/label.model';
import { ILabelService } from './label.interface';
import { HttpClient } from '@angular/common/http';
import { EndPointMapper } from 'src/app/helpers/endpoint-mapper.helper.service';

@Injectable({
  providedIn: 'root'
})
export class LabelService implements ILabelService {

  constructor(
    private httpClient: HttpClient,
    private endpointMapper: EndPointMapper
  )
  { }
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
  listAllLabels(): Promise<Label[]> {
    const endpoint = this.endpointMapper.getEndPointUrl('label', 'getAll');
    return this.httpClient.get<Label[]>(endpoint).toPromise();
  }
  removeLabel(name: string): void {
    TODO: 'Method not implemented.'
    throw new Error('Method not implemented.');
  }
}
