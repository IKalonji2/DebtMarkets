import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formTitle: string = '';
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
      name: 'entity',
      type: 'text',
      label: 'Entity',
      // placeholder: 'Entity',
      value: '',
      validators: [Validators.required],
      errorMessage: 'Entity is required'
    },
    {
      name: 'type',
      type: 'text',
      label: 'Type',
      // placeholder: 'Type',
      value: '',
      validators: [Validators.required, Validators.email],
      errorMessage: 'Type  is required'
    },
    {
      name: 'certificate',
      type: 'text',
      label: 'Certificate Number',
      // placeholder: 'Certificate Number',
      value: '',
      validators: [Validators.required, Validators.minLength(6)],
      errorMessage: 'Invalid Certificate Number'
    }
    ,
    {
      name: 'region',
      type: 'text',
      label: 'Operating Region',
      // placeholder: 'Operating Region',
      value: '',
      validators: [Validators.required, Validators.minLength(6)],
      errorMessage: 'Operating region  is required'
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      value: '',
      validators: [Validators.required],
      errorMessage: 'Password  is required'
    },
    {
      name: 'confirm password',
      type: 'password',
      label: 'Confirm Password',
      value: '',
      validators: [Validators.required],
      errorMessage: 'Passwords do not match'
    }
  ];

  ngOnInit() {
    this.formTitle = localStorage.getItem('formTitle') || 'Lender / Collector Form';

    if (this.formTitle === 'Trader') {
      this.formConfig = [
        {
          name: 'names',
          type: 'text',
          label: 'Full Names',
          // placeholder: 'Entity',
          value: '',
          validators: [Validators.required],
          errorMessage: 'Full Names is required'
        },
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
        },
        {
          name: 'confirm password',
          type: 'password',
          label: 'Confirm Password',
          value: '',
          validators: [Validators.required],
          errorMessage: 'Passwords do not match'
        }
      ];
    }
  };

  handleFormSubmit(values: any): void {
    console.log('Form Submitted:', values);
  }

}
