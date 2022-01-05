import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from 'src/app/event/models/event.model';
import { ModalResultService } from 'src/app/helpers/modal.service';
import { FavoriteService } from 'src/app/media/services/favorite.service';
import { IActionButtons } from 'src/app/shared/components/table/models/action-buttons.model';
import { IDashboardTable } from 'src/app/shared/components/table/models/table.model';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.sass'],
})
export class FavoriteListComponent implements OnInit {
  title: string = 'Llista de favorits';
  myFavoriteEvents: IEvent[] = [];
  dataTable: IDashboardTable = {} as IDashboardTable;
  actionButtons: IActionButtons = {
    active: true,
    resource: '/event/dashboard/event',
    actions: {
      view: true,
      edit: false,
      delete: false,
    },
  } as IActionButtons;

  constructor(
    private favoriteService: FavoriteService,
    private router: Router,
    private modalResultService: ModalResultService
  ) {}

  ngOnInit(): void {
    this.getMyFavoriteEvents();
  }

  getMyFavoriteEvents(): void {
    this.favoriteService
      .listAllMyFavorites()
      .then((res) => {
        if (res && res.length) {
          this.myFavoriteEvents = res;
        }
      })
      .then(() => {
        this.dataTable.title = "Llistat d'actes favorits";
        this.dataTable.colsName = [
          { colName: 'name', text: 'Nom' },
          { colName: 'startDate', text: 'Comença' },
          { colName: 'endDate', text: 'Acaba' },
          { colName: 'rating', text: 'Punts' },
          { colName: 'rating', text: 'Total votacions' },
        ];
        this.dataTable.data = this.myFavoriteEvents;
        this.dataTable.inverse = false;
      })
      .catch((err) => {
        this.router.navigate(['/profile/dashboard/home']).then(() => {
          this.modalResultService.errorResultModal();
        });
      });
  }
}
