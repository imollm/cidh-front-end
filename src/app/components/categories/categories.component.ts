import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/administration/models/category.model';
import { CategoryService } from 'src/app/administration/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  actualPage: number = 1;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categories = this.categoryService.listAllCategories();
  }
}
