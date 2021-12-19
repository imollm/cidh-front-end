import { Component, OnInit } from '@angular/core';
import { Label } from 'src/app/administration/models/label.model';
import { LabelService } from 'src/app/administration/services/label/label.service';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.sass']
})
export class LabelsComponent implements OnInit {

  labels: Label[] = [];
  actualPage: number = 1;

  constructor(private labelService: LabelService) { }

  ngOnInit(): void {
    this.getAllLabels();
  }

  getAllLabels() {
    this.labels = this.labelService.listAllLabels();
  }

}
