import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from 'src/app/administration/models/category.model';
import { CategoryService } from 'src/app/administration/services/category.service';
import { IActionButtons } from 'src/app/shared/components/table/models/action-buttons.model';
import { IDashboardTable } from 'src/app/shared/components/table/models/table.model';

@Component({
  selector: 'app-categories',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.sass']
})
export class CategoryListComponent implements OnInit {

  title: string = 'Gestiona les categories'
  categories : Category[] = []
  dataTable : IDashboardTable = {} as IDashboardTable
  
  actionButtons : IActionButtons = {
    active: true,
    resource: '/administration/dashboard/category',
    actions: {
      view: false,
      edit: true,
      delete: false,
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
      this.spinner.show()
      this.categoriService.listAllCategories().then(res => {
        if(res.length > 0){
          this.categories = res
          this.setDataTable()
        }
        this.spinner.hide()
        })
      }
  
  setDataTable() : void {
    this.dataTable.title = 'Categories registrades'
    this.dataTable.colsName = [
      { colName: 'name', text: 'Nom' },
      { colName: 'description', text: 'Descripció' },
      { colName: 'createdAt', text: 'Data de creació' }
    ]
    this.dataTable.data = this.categories
    this.dataTable.data.forEach(category => {
      category.createdAt = Intl.DateTimeFormat('es-ES').format(category.createdAt*1000)
    })
  }

}
