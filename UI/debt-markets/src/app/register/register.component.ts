import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  step: number = 1;
  formTitle: string = '';
  step1Config = [
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
      errorMessage: 'Password is required'
    },
    {
      name: 'passwordConfirmation',
      type: 'password',
      label: 'Confirm Password',
      value: '',
      validators: [Validators.required],
      errorMessage: 'Passwords do not match'
    }
  ];

  step2ConfigLender = [
    {
      name: 'businessName',
      type: 'text',
      label: 'Business Name',
      value: '',
      validators: [Validators.required],
      errorMessage: 'Business Name is required'
    },
    {
      name: 'certificate',
      type: 'text',
      label: 'Certificate Number',
      value: '',
      validators: [Validators.required, Validators.minLength(6)],
      errorMessage: 'Invalid Certificate Number'
    }
  ];

  step2ConfigCollector = [
    {
      name: 'entity',
      type: 'text',
      label: 'Entity Name',
      value: '',
      validators: [Validators.required],
      errorMessage: 'Entity Name is required'
    },
    {
      name: 'region',
      type: 'text',
      label: 'Operating Region',
      value: '',
      validators: [Validators.required],
      errorMessage: 'Operating Region is required'
    }
  ];

  formConfig = this.step1Config;

  ngOnInit() {
    this.formTitle = localStorage.getItem('formTitle') || 'Lender / Collector Registration';

    if (this.formTitle === 'Trader') {
      this.formConfig = [
        {
          name: 'names',
          type: 'text',
          label: 'Full Names',
          value: '',
          validators: [Validators.required],
          errorMessage: 'Full names are required'
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
          name: 'passwordConfirmation',
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
    if (this.formTitle !== 'Trader') {
      if (this.step === 1) {
        console.log('Step 1 Data:', values);
        this.nextStep();
      } else {
        console.log('Step 2 Data:', values);
        console.log('Form Submitted Successfully!');
      }
    }
  }
  nextStep(): void {
    if (this.step === 1) {
      this.step = 2;
      this.formConfig = this.formTitle === 'Lender' ? this.step2ConfigLender : this.step2ConfigCollector;
    }
  }
  previousStep(): void {
    if (this.step === 2) {
      this.step = 1;
      this.formConfig = this.step1Config;
    }
  }

}
