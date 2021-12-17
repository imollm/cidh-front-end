import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/administration/models/category.model';
import { CategoryService } from '../../administration/services/category/category.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  actualPage: number = 1;

  constructor(private categoryService: CategoryService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.categoryService.listAllCategories().then(res => {
      this.categories = res;
    }).then(() => {
      this.spinner.hide();
    });
  }
}
