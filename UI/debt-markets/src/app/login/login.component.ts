import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formConfig = [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      value: '',
      validators: [Validators.required, Validators.email],
      errorMessage: 'Email is required'
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      value: '',
      validators: [Validators.required],
      errorMessage: 'Password  is required'
    }
  ];
  handleFormSubmit(values: any): void {
    console.log('Form Submitted:', values);
  }
}
