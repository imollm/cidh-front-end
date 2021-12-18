import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from 'src/app/administration/models/category.model';
import { CategoryService } from 'src/app/administration/services/category.service';
import { IActionButtons } from 'src/app/shared/components/table/models/action-buttons.model';
import { IDashboardTable } from 'src/app/shared/components/table/models/table.model';
import { TableComponent } from 'src/app/shared/components/table/table.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {
  
  dataTable: IDashboardTable = {
      title : 'Categories',
      colsName : [
      { colName: 'name', text: 'Nom' },
      { colName: 'description', text: 'Descripció' },
      { colName: 'createdAt', text: 'Data de creació' }
    ],
      data : [],
    inverse : false
  } as IDashboardTable
  
  actionButtons : IActionButtons = {
    active: true,
    resource: 'categories',
    actions: {
      view: false,
      edit: true,
      delete: true,
    }
  } as IActionButtons



  constructor(
    private categoriService: CategoryService, 
    private spinner: NgxSpinnerService
    ) { }


  ngOnInit(): void {
    this.getCategories()
    }


  getCategories() : void{
    this.categoriService.listAllCategories().then(res => {
      this.dataTable.data = res
    })
  }

  createCategory(category: Category): void{
    this.spinner.show()
    this.categoriService.addCategory(category).then(res => {
      this.getCategories()
      this.spinner.hide()
    })
  }

  updateCategory(category : Category): void {
    this.spinner.show()
    this.categoriService.updateCategory(category).then(res => {
      this.getCategories()
      this.spinner.hide()
    })
  }

}
