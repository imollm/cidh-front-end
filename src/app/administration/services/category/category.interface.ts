import { Category } from "../../models/category.model";

export interface ICategoryService {
  addCategory(category: Category): Promise<Category>;
  updateCategory(category: Category, categoryId: string): Promise<Category>;
  showCategory(categoryId: string): Promise<Category>;
  listAllCategories(): Promise<Category[]>;
}
