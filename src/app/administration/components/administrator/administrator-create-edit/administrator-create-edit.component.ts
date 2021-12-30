import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdministratorService } from 'src/app/administration/services/administrator/administrator.service';
import { ModalResultService } from 'src/app/helpers/modal.service';
import { UtilsService } from 'src/app/helpers/utils.helper.service';
import { IUser } from 'src/app/profile/models/user.model';
import { preferredLanguages } from 'src/app/profile/models/preferredLanguages.model';

@Component({
  selector: 'app-administrator-create-edit',
  templateUrl: './administrator-create-edit.component.html',
  styleUrls: ['./administrator-create-edit.component.sass']
})
export class AdministratorCreateEditComponent implements OnInit {

  title: string = 'Crear un nou administrador';
  btnText: string = 'Crear';
  form: FormGroup;
  mode: string;
  adminId: string;
  administrator: IUser = {} as IUser;
  languages = preferredLanguages;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalResultService: ModalResultService,
    private adminService: AdministratorService
  ) {
    this.form = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password1: new FormControl('', [UtilsService.strong, Validators.minLength(8)]),
      password2: new FormControl('', [UtilsService.strong, Validators.minLength(8)])
    });
  }

  ngOnInit(): void {
    this.mode = UtilsService.getMode(this.router.url); 

    if (this.mode && this.mode === 'create') {
      this.createMode();
    } else if (this.mode && this.mode === 'edit') {
      this.editMode();
      this.title = 'Edita l\'administrador';
      this.btnText = 'Edita';
    }
  }

  createMode(): void {
    this.form.reset();
  }

  editMode(): void {
    this.adminId = UtilsService.getResourceIdFromURI(this.router.url);
    this.adminId 
      ? this.getAdministrator()
      : this.router.navigate(['/administration/dashboard/administrator/list']);
  }

  onSubmit(): void {
    if (this.form.valid && this.isPwdEquals()) {
      this.spinner.show();

      this.setPassword();

      if (this.mode && this.mode === 'create') {
        let newAdmin = this.form.value;
        newAdmin.role = 'admin';

        this.adminService.addAdministrator(newAdmin).then(res => {
          this.administrator = res;
        })
        .then(() => this.redirectUser(true))
        .catch(err => this.redirectUser(false));

      } else if (this.mode && this.mode === 'edit') {
        this.adminService.updateAdministrator(this.adminId, this.form.value).then(res => {
          this.administrator = res;
        }).then(() => this.redirectUser(true))
        .catch(err => this.redirectUser(false));
      }
    }
  }

  isPwdEquals(): boolean {
    return this.form.get('password1').value === this.form.get('password2').value;
  }

  setPassword(): void {
    const pwd = this.form.value.password1;

    delete this.form.value.password1;
    delete this.form.value.password2;

    this.form.value.password = pwd;
  }

  getAdministrator(): void {
    this.adminService.showAdministrator(this.adminId).then(res => {
      if (res) {
        this.administrator = res;
        this.form.patchValue({
          firstName: this.administrator.firstName,
          lastName: this.administrator.lastName,
          fiscalId: this.administrator.fiscalId,
          address: this.administrator.address,
          preferredLanguage: this.administrator.preferredLanguage,
          email: this.administrator.email
        });
      }
    });
  }

  // Redirect user on list component and show modal with result
  redirectUser(valid: boolean): void {
    this.router.navigate(['/administration/dashboard/administrator/list']).then(() => {
      let result: boolean = this.administrator.hasOwnProperty('id');

      if (this.mode === 'create') {
        this.modalResultService.createResultModal(valid && result);
      } else if (this.mode === 'edit') {
        this.modalResultService.editResultModal(valid && result);
      }
    }).then(() => this.spinner.hide());
  }

}
