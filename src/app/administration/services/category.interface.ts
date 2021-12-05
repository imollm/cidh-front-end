import { Category } from "../models/category";

export interface ICategoryService {
  addCategory(name: string, description: string): void;
  updateCategory(name: string, description: string): void;
  showCategory(name: string): void;
  listAllCategories(): Category[];
}
