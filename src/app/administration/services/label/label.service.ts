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
  addLabel(label: Label): Promise<Label> {
    const endpoint = this.endpointMapper.getEndPointUrl('label', 'create');
    console.log(endpoint)
    return this.httpClient.post<Label>(endpoint, label).toPromise();
  }
  updateLabel(labelId: string, label: Label): Promise<Label> {
    const endpoint = this.endpointMapper.getEndPointUrl('label', 'updateById', labelId);
    console.log(endpoint)
    return this.httpClient.post<Label>(endpoint, label).toPromise();
  }
  showLabel(labelId: string): Promise<Label> {
    const endpoint = this.endpointMapper.getEndPointUrl('label', 'getById', labelId);
    return this.httpClient.get<Label>(endpoint).toPromise();
  }
  listAllLabels(): Promise<Label[]> {
    const endpoint = this.endpointMapper.getEndPointUrl('label', 'getAll');
    return this.httpClient.get<Label[]>(endpoint).toPromise();
  }
  removeLabel(labelId: string): Promise<boolean> {
    const endpoint = this.endpointMapper.getEndPointUrl('label', 'deleteById', labelId);
    console.log(endpoint)
    return this.httpClient.delete<boolean>(endpoint).toPromise();
  }
}
