import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from 'src/app/administration/models/category.model';
import { CategoryService } from 'src/app/administration/services/category/category.service';
import { ModalResultService } from 'src/app/helpers/modal.service';
import { UtilsService } from 'src/app/helpers/utils.helper.service';

@Component({
  selector: 'app-category-create-edit',
  templateUrl: './category-create-edit.component.html',
  styleUrls: ['./category-create-edit.component.sass']
})
export class CategoryCreateEditComponent implements OnInit {

  title: string = 'Crear una nova categoria'
  form: FormGroup
  btnText: string = 'Crear'
  mode: string
  categoryId: string
  category: Category

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router : Router,
    private spinner: NgxSpinnerService,
    private modalResultService: ModalResultService
  ) { 
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.mode = UtilsService.getMode(this.router.url);
    if (this.mode && this.mode === 'create') {
      this.createMode();
    } else if (this.mode && this.mode === 'edit') {
      this.editMode();
      this.title = 'Edita la categoria';
      this.btnText = 'Editar';
    }
  }

  createMode(): void {
    this.form.reset();
  }

  editMode(): void {
    this.categoryId = UtilsService.getResourceIdFromURI(this.router.url);
    this.categoryId
      ? this.getCategory()
      : this.router.navigate(['/administration/dashboard/category/list']);
  }

  getCategory(): void {
    this.categoryService.showCategory(this.categoryId).then(res => {
      this.spinner.show();
      if (res) {
        this.category = res;
        this.categoryId = this.category.id;
        this.form.patchValue({
          name: this.category.name,
          description: this.category.description
        });
      }
      this.spinner.hide();
    })
  }

  onSubmit(): void {
    if (this.form.valid){
      this.spinner.show()
      if (this.mode && this.mode === 'create') {
        this.categoryService.addCategory(this.form.value).then(res => {
          this.category = res;
        }).then(() => this.redirectUser());
      } else if (this.mode && this.mode === 'edit') {
        this.categoryService.updateCategory(this.form.value, this.categoryId).then(res => {
          this.category = res;
        }).then(() => this.redirectUser());
      }
    }
  }

  redirectUser(): void {
    this.router.navigate(['/administration/dashboard/category/list']).then(() => {
      let result: Boolean = this.category.hasOwnProperty('id');

      if (this.mode === 'create') {
        this.modalResultService.createResultModal(result);
      } else if (this.mode === 'edit') {
        this.modalResultService.editResultModal(result);
      }
    }).then(() => this.spinner.hide());
  }

}
