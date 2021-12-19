import { Category } from "../../models/category.model";

export interface ICategoryService {
  addCategory(category: Category): Promise<Category>;
  updateCategory(category: Category): Promise<Category>;
  showCategory(category: Category): Promise<Category>;
  listAllCategories(): Promise<Category[]>;
}
