import { Component } from '@angular/core';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { IDashboardTable } from 'src/app/shared/components/table/models/table.model';
import { faTimes, faEye, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { IActionButtons } from 'src/app/shared/components/table/models/action-buttons.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  formTitle= 'Home';
  dataTable: any;
  //actionsButtons: any;
  constructor() 
  { 
    
  }

  ngOnInit(): void {
    this.setDataTable();
  }

  setDataTable(): void {
    this.dataTable.title = 'Títol de la taula';
    this.dataTable.colsName = [
      { colName: 'name', text: 'Nom' },
      { colName: 'email', text: 'Email' },

    ];
    this.dataTable.data = [
      { name: 'Juan', email: 'correo@correo.com'},
      { name: 'Juan', email: 'correo@correo.com'},
      
    ];
    this.dataTable.inverse = false;
  }
  

}


