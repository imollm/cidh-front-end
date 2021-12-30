import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { IUser } from '../profile/models/user.model';
import { ModalResultIcon } from './modal.icon.enum';

@Injectable({
  providedIn: 'root'
})

export class ModalResultService {

  private readonly unsuccessfullyLoginTitleError = 'Login incorrecte';
  private readonly unsuccessfullyLoginTextError = 'Email i/o constrasenya incorrectes.';

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

  private readonly commentHasBeenSentTitle = 'Gràcies per la teva col·laboració';
  private readonly commentHasBeenSentText = 'El comentari s\'ha enviat correctament';
  private readonly commentHasNotBeenSent = 'El comentari no s\'ha enviat correctament';

  private readonly canNotDoThisActionTitle = 'No tens permís!';
  private readonly canNotDoThisActionText = 'No tens permissos per realitzar aquesta acció.';

  private resultTitle: string;
  private resultText: string;
  private resultIcon: ModalResultIcon;

  constructor() { }

  showModal(title: string, text: string, icon: ModalResultIcon): void {
    this.resultTitle = title;
    this.resultText = text;
    this.resultIcon = icon;

    this.fireSwal();
  }

  youCanNotDoThisAction(): void {
    this.resultTitle = this.canNotDoThisActionTitle;
    this.resultText = this.canNotDoThisActionText;
    this.resultIcon = ModalResultIcon.warning;
  }

  successPostComment(): void {
    this.resultTitle = this.commentHasBeenSentTitle;
    this.resultText = this.commentHasBeenSentText;
    this.resultIcon = ModalResultIcon.success;

    this.fireSwal();
  }

  unsuccessfulLogin(): void {
    this.resultTitle = this.unsuccessfullyLoginTitleError;
    this.resultText = this.unsuccessfullyLoginTextError;
    this.resultIcon = ModalResultIcon.error;

    this.fireSwal();
  }

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

  signUpSuccessResult(user: IUser): void {
    this.resultTitle = 'Enhorabona ' + `${user.firstName} ${user.lastName}!`.toLocaleUpperCase();
    this.resultText = 'Te has registrat a Cultureindahouse.';
    this.resultIcon = ModalResultIcon.success;

    this.fireSwal();
  }

  signUpErrorResult(): void {
    this.resultTitle = 'Ooops!';
    this.resultText = 'El registre ha fallat, torna a intentar-ho.';
    this.resultIcon = ModalResultIcon.error;

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
