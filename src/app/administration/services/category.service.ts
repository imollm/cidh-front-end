import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { ICategoryService } from './category.interface';
import * as faker from 'faker';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements ICategoryService {

  constructor(private httpClient: HttpClient) {

  }
  addCategory(name: string, description: string): void {
    throw new Error('Method not implemented.');
  }
  updateCategory(name: string, description: string): void {
    throw new Error('Method not implemented.');
  }
  showCategory(name: string): void {
    throw new Error('Method not implemented.');
  }
  listAllCategories(): Category[] {
    let categories: Category[] = [];
    for (let i = 0; i < 10; i++) {
      categories.push({
        name: faker.commerce.productName(),
        description: faker.commerce.productAdjective()
      });
    }
    return categories;
  }
}
