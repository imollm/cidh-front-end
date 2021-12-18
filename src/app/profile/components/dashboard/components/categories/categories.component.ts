import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/administration/models/category.model';
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

  constructor() { }

  ngOnInit(): void {
    this.dataTable.data = this.getCategories()
  }


  getCategories() : Category[]{
    return [
      { name: 'Juan', description: 'correo@correo.com', createdAt: Date.now(), id:'1'},
      { name: 'Juan', description: 'correo@correo.com', createdAt: 12345678790, id:'2'},
      { name: 'Juan', description: 'correo@correo.com', createdAt: 12345678790, id:'3'},
      { name: 'Juan', description: 'correo@correo.com', createdAt: 12345678790, id:'4'},
      { name: 'Juan', description: 'correo@correo.com', createdAt: 12345678790, id:'5'}

    ]
  }

}
