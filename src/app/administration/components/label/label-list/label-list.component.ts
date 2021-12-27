import { Component, OnInit } from '@angular/core';
import { Label } from 'src/app/administration/models/label.model';
import { LabelService } from 'src/app/administration/services/label/label.service';
import { IActionButtons } from 'src/app/shared/components/table/models/action-buttons.model';
import { IDashboardTable } from 'src/app/shared/components/table/models/table.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/helpers/utils.helper.service';
import { ModalResultService } from 'src/app/helpers/modal.service';

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
    resource: '/administration/dashboard/labels',
    actions: {
      view: false,
      edit: true,
      delete: true
    }
  } as IActionButtons;

  constructor(
    private labelService: LabelService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private modalResultService: ModalResultService
  ) { }

  ngOnInit(): void {
    let mode = UtilsService.getMode(this.router.url);

    if (mode === 'delete') {
      let labelId = UtilsService.getResourceIdFromURI(this.router.url);
      this.deleteLabel(labelId);
    }
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

  deleteLabel(labelId: string): void {
    this.labelService.removeLabel(labelId).then(res => {})
    .then(() => this.modalResultService.deleteResultModal(true))
    .catch(err => {
      this.modalResultService.deleteResultModal(false);
    });
  }

}
