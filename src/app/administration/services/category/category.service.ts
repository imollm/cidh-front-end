import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../models/category.model';
import { ICategoryService } from './category.interface';
import { EndPointMapper } from '../../../helpers/endpoint-mapper.helper.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements ICategoryService {

  private readonly resource: string = 'category';

  constructor(
    private httpClient: HttpClient,
    private endpointMapper: EndPointMapper
    ) { }

  addCategory(category: Category): Promise<Category> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'create');
    console.log(endpoint)
    return this.httpClient.post<Category>(endpoint, category).toPromise();
  }
  updateCategory(category: Category, categoryId: string): Promise<Category> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'updateById', categoryId);
    return this.httpClient.put<Category>(endpoint, category).toPromise();
  }
  showCategory(categoryId: string): Promise<Category> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'getById', categoryId);
    return this.httpClient.get<Category>(endpoint).toPromise();
  }
  listAllCategories(): Promise<Category[]> {
    const endpoint = this.endpointMapper.getEndPointUrl(this.resource, 'getAll');
    return this.httpClient.get<Category[]>(endpoint).toPromise();
  }
}
