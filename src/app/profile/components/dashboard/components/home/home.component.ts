import { Component } from '@angular/core';
import { IDashboardTable } from 'src/app/shared/components/table/models/table.model';
import { IActionButtons } from 'src/app/shared/components/table/models/action-buttons.model';
import { AuthService } from 'src/app/profile/services/auth/auth.service';
import { IUser } from 'src/app/profile/models/user.model';
import { UtilsService } from 'src/app/helpers/utils.helper.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  formTitle= 'Home';
  me: IUser;
  role: string;
  dataTable: IDashboardTable = {} as IDashboardTable;
  actionButtons: IActionButtons = {
    active: false
  } as IActionButtons;

  constructor(private authService: AuthService) 
  { }

  ngOnInit(): void {
    this.authService.getUser().then(res => {
      if (res && res.id) {
        this.me = res;
      }
    }).then(() => {
      this.role = UtilsService.getRoleFromAccessToken();

      if (this.role === 'USER') {
        this.setUserHome();
      } else if (this.role === 'ADMIN') {
        this.setAdminHome();
      } else if (this.role === 'SUPERADMIN') {
        this.setSuperAdminHome();
      }

      this.setDataTable();
    });
  }

  setUserHome(): void {
     let userHomeData = this.me.homeData;
  }

  setAdminHome(): void {
   let adminHomeData = this.me.homeData;
  }

  setSuperAdminHome(): void {
    let superAdminHomeData = this.me.homeData;
  }

  setDataTable(): void {
    let title: string;
    let columns: [] = [];
    let data: [] = [];
    
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


