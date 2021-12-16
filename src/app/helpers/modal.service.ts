import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { IUser } from '../profile/models/user.model';

enum ModalResultIcon {
  success = 'success',
  error = 'error',
  warning = 'warning'
}

@Injectable({
  providedIn: 'root'
})

export class ModalResultService {

  private readonly createTitleSuccess = 'Creat correctament!';
  private readonly createTitleError = 'Error al crear!';
  private readonly createTextSuccess = 'El recurs s\'ha creat satisfactoriament.';
  private readonly createTextError = 'El recurs no s\'ha creat satisfactoriament.';

  private readonly editTitleSuccess = 'Editat correctament!';
  private readonly editTitleError = 'Error al editar!';
  private readonly editTextSuccess = 'El recurs s\'ha editat satisfactoriament';
  private readonly editTextError = 'El recurs no s\'ha editat satisfactoriament';

  private readonly deleteTitleSuccess = 'Eliminat correctament!';
  private readonly deleteTitleError = 'Error al eliminar!';
  private readonly deleteTextSuccess = 'El recurs s\'ha eliminat satisfactoriament.';
  private readonly deleteTextError = 'El recurs no s\'ha eliminat satisfactoriament.';

  private resultTitle: string;
  private resultText: string;
  private resultIcon: ModalResultIcon;

  constructor() { }

  createResultModal(resultResponse: Boolean): void {
    if (resultResponse) {
      this.resultTitle = this.createTitleSuccess;
      this.resultText = this.createTextSuccess;
      this.resultIcon = ModalResultIcon.success;
    } else {
      this.resultTitle = this.createTitleError;
      this.resultText = this.createTextError;
      this.resultIcon = ModalResultIcon.error;
    }
    this.fireSwal();
  }

  editResultModal(resultResponse: Boolean): void {
    if (resultResponse) {
      this.resultTitle = this.editTitleSuccess;
      this.resultText = this.editTextSuccess;
      this.resultIcon = ModalResultIcon.success;
    } else {
      this.resultTitle = this.editTitleError;
      this.resultText = this.editTextError;
      this.resultIcon = ModalResultIcon.error;
    }
    this.fireSwal();
  }

  deleteResultModal(resultResponse: Boolean): void {
    if (resultResponse) {
      this.resultTitle = this.deleteTitleSuccess;
      this.resultText = this.deleteTextSuccess;
      this.resultIcon = ModalResultIcon.success;
    } else {
      this.resultTitle = this.deleteTitleError;
      this.resultText = this.deleteTextError;
      this.resultIcon = ModalResultIcon.error;
    }
    this.fireSwal();
  }

  errorResultModal(): void {
    this.resultTitle = 'Ooops!';
    this.resultText = 'Alguna cosa no ha anat bé, torna a provar d\'aquí una estona';
    this.resultIcon = ModalResultIcon.error;
    this.fireSwal();
  }

  registerResultModal(user: IUser): void {
    if (user) {
      this.resultTitle = 'Enhorabona ' + `${user.firstName} ${user.lastName}!`.toLocaleUpperCase();
      this.resultText = 'Te has registrat a Cultureindahouse.';
      this.resultIcon = ModalResultIcon.success;
    } else {
      this.resultTitle = 'Ooops!';
      this.resultText = 'El registre ha fallat, contacte amb l\'Administrador.';
      this.resultIcon = ModalResultIcon.error;
    }
    this.fireSwal();
  }

  private fireSwal(): void {
    Swal.fire({
      title: this.resultTitle,
      text: this.resultText,
      icon: this.resultIcon
    });
  }
}
