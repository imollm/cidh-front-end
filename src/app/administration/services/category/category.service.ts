import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../models/category.model';
import { ICategoryService } from './category.interface';
import { EndPointMapper } from '../../../helpers/endpoint-mapper.helper.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements ICategoryService {

  constructor(
    private httpClient: HttpClient,
    private endpointMapper: EndPointMapper
    ) { }

  addCategory(category: Category): Promise<Category> {
    const endpoint = this.endpointMapper.getEndPointUrl('category', 'create');
    return this.httpClient.post<Category>(endpoint, category).toPromise();
  }
  updateCategory(category: Category): Promise<Category> {
    const endpoint = this.endpointMapper.getEndPointUrl('category', 'updateById', category.id);
    return this.httpClient.put<Category>(endpoint, category).toPromise();
  }
  showCategory(category: Category): Promise<Category> {
    const endpoint = this.endpointMapper.getEndPointUrl('category', 'getById', category.id);
    return this.httpClient.get<Category>(endpoint).toPromise();
  }
  listAllCategories(): Promise<Category[]> {
    const endpoint = this.endpointMapper.getEndPointUrl('category', 'getAll');
    return this.httpClient.get<Category[]>(endpoint).toPromise();
  }
}
