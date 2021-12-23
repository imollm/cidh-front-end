import { Component, OnInit } from '@angular/core';
import { Label } from 'src/app/administration/models/label.model';
import { LabelService } from 'src/app/administration/services/label/label.service';
import { IActionButtons } from 'src/app/shared/components/table/models/action-buttons.model';
import { IDashboardTable } from 'src/app/shared/components/table/models/table.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.sass']
})
export class LabelListComponent implements OnInit {

  title: string = 'Gestiona les etiquetes';
  labels: Label[] = [];
  dataTable: IDashboardTable = {} as IDashboardTable;
  actionButtons: IActionButtons = {
    active: true,
    resource: '/administration/dashboard/label',
    actions: {
      view: true,
      edit: true,
      delete: true
    }
  } as IActionButtons;

  constructor(
    private labelService: LabelService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getLabels();
  }

  getLabels(): void {
    this.spinner.show();
    this.labelService.listAllLabels().then(res => {
      if (res.length > 0) {
        this.labels = res;
        this.setDataTable();
      }
      this.spinner.hide();
    });
  }

  setDataTable(): void {
    this.dataTable.title = "Etiquetes registrades";
    this.dataTable.colsName = [
      { colName: "name",  text: "Nom" },
      { colName: "description",  text: "Descripció" },
      { colName: "createdAt",  text: "Creada" }
    ];
    this.dataTable.data = this.labels;
  }

}
