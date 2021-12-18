import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IDashboardTable } from './models/table.model';
import { faTimes, faEye, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { IActionButtons } from './models/action-buttons.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnChanges {

  @Input() toShow: IDashboardTable = {} as IDashboardTable;
  @Input() actionButtons: IActionButtons;
  dataTable: IDashboardTable = {} as IDashboardTable;

  faView = faEye;
  faEdit = faPencilAlt;
  faDelete = faTimes;

  constructor(
    private router: Router
  ) { }

  showDeleteModal(url: string): void {
    Swal.fire({
      title: 'Estas segur de voler eliminar?',
      text: 'L\'acció no es podra desfer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#589c1d',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimina!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate([url]);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataTable = changes.toShow.currentValue;
  }

  formatDate(timestamp: number){
    return Intl.DateTimeFormat('es-ES').format(timestamp)
  }
}
