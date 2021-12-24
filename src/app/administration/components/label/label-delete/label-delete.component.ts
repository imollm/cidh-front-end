import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LabelService } from 'src/app/administration/services/label/label.service';
import { ModalResultService } from 'src/app/helpers/modal.service';
import { UtilsService } from 'src/app/helpers/utils.helper.service';

@Component({
  selector: 'app-label-delete',
  templateUrl: './label-delete.component.html',
  styleUrls: ['./label-delete.component.sass']
})
export class LabelDeleteComponent implements OnInit {

  constructor(
    private router: Router,
    private modalResultService: ModalResultService,
    private labelService: LabelService
  ) { }

  ngOnInit(): void {
    let labelId = UtilsService.getResourceIdFromURI(this.router.url);
    console.log(labelId);
    this.labelService.removeLabel(labelId).then(() => {
      this.router.navigate(['/dashboard/labels/list']).then(() => {
        this.modalResultService.deleteResultModal(true)
      })
    }).catch(err => {
      console.log(err)
      this.modalResultService.deleteResultModal(false)
    })
  }

}
