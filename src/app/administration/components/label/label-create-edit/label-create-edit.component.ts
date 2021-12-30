import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Label } from 'src/app/administration/models/label.model';
import { LabelService } from 'src/app/administration/services/label/label.service';
import { ModalResultService } from 'src/app/helpers/modal.service';
import { UtilsService } from 'src/app/helpers/utils.helper.service';

@Component({
  selector: 'app-label-create-edit',
  templateUrl: './label-create-edit.component.html',
  styleUrls: ['./label-create-edit.component.sass']
})
export class LabelCreateEditComponent implements OnInit {

  title: string = 'Crear nova etiqueta';
  btnText: string = 'Crear';
  form: FormGroup;
  mode: string;
  labelId: string;
  label: Label = {} as Label;

  constructor(
    private fb: FormBuilder,
    private labelService: LabelService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalResultService: ModalResultService,
  ) {
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.mode = UtilsService.getMode(this.router.url); 

    if (this.mode && this.mode === 'create') {
      this.createMode();
    } else if (this.mode && this.mode === 'edit') {
      this.editMode();
      this.title = 'Edita l\'etiqueta';
      this.btnText = 'Edita';
    }
  }

  createMode(): void {
    this.form.reset();
  }

  editMode(): void {
    this.labelId = UtilsService.getResourceIdFromURI(this.router.url);
    this.labelId 
      ? this.getlabel()
      : this.router.navigate(['/administration/dashboard/label/list']);
  }
  
  getlabel(): void {
    this.labelService.showLabel(this.labelId).then(res => {
      this.spinner.show();
      if (res) {
        this.label = res;
        this.labelId = this.label.id;
        this.form.patchValue({
          name: this.label.name,
          description: this.label.description
        });
      }
      this.spinner.hide();
    }).catch(err => console.log(err));
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.spinner.show();

      if (this.mode && this.mode === 'create') {
        this.labelService.addLabel(this.form.value).then(res => {
          this.label = res;
        }).then(() => this.redirectUser());
      } else if (this.mode && this.mode === 'edit') {
        this.labelService.updateLabel(this.labelId, this.form.value).then(res => {
          this.label = res;
        }).then(() => this.redirectUser());
      }
    }
  }

  // Redirect user on list component and show modal with result
  redirectUser(): void {
    this.router.navigate(['/administration/dashboard/labels/list']).then(() => {
      let result: Boolean = this.label.hasOwnProperty('id');

      if (this.mode === 'create') {
        this.modalResultService.createResultModal(result);
      } else if (this.mode === 'edit') {
        this.modalResultService.editResultModal(result);
      }
    }).then(() => this.spinner.hide());
  }

}
