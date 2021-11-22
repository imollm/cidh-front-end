import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  formTitle = 'Registre nou usuari';

  constructor() { }

  ngOnInit(): void {
  }

}
