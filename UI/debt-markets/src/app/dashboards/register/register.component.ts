import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { UserRegistration } from '../../models/user-registration';
import { AuthAPIService } from '../../services/auth-service/auth-api.service';
import { FormField } from '../../models/form-field';
import { AuthService } from '../../services/auth-service/auth.service';
import { AuthResponse } from '../../models/auth-response.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  currentStep: number = 1;
  formTitle: string = '';
  errorMessage: string = '';

  step1Config: FormField[] = [
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
      validators: [Validators.required, this.validatePasswordMatch.bind(this)],
      errorMessage: 'Passwords do not match'
    }
  ];

  step2Config: FormField[] = [
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
    },
    {
      name: 'region',
      type: 'select',
      label: 'Operational Regions',
      options: [
        { label: 'Gauteng', value: 'gp' },
        { label: 'Kwa-Zulu Natal', value: 'kzn' },
        { label: 'Polokwane', value: 'plk' },
        { label: 'Eastern Cape', value: 'ec' },
        { label: 'Western Cape', value: 'wc' },
      ],
      errorMessage: 'Please select a region',
    }
  ];

  formConfig = this.step1Config;

  constructor(
    private authApiService: AuthAPIService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.formTitle = localStorage.getItem('formTitle') || 'Lender / Collector';
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
    } else {
      this.formConfig = this.step1Config;
    }
  }

  nextStep(): void {
    if (this.currentStep === 1) {
      this.currentStep = 2;
      this.formConfig = this.step2Config;

      this.cdr.detectChanges();
      console.log('Moved to Step 2. Form Config:', this.formConfig);
    }
  }

  previousStep(): void {
    if (this.currentStep === 2) {
      this.currentStep = 1;
      this.formConfig = this.step1Config;

      this.cdr.detectChanges();
      console.log('Moved to Step 1. Form Config:', this.formConfig);
    }
  }

  private validatePasswordMatch(control: AbstractControl): ValidationErrors | null {
    const parent = control.parent;
    if (!parent) return null;

    const password = parent.get('password')?.value;
    const confirmPassword = control.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  handleFormSubmit(values: any): void {
    if (this.formTitle === 'Trader') {
      const trader = this.formTitle.toLowerCase() as 'trader';
      const userRegistrationPayload: UserRegistration = {
        name: values.names,
        email: values.email,
        password: values.password,
        role: trader,
      };

      this.authApiService.createUser(userRegistrationPayload).subscribe({
        next: (response: AuthResponse) => {
          console.log('Trader Registration Successful:', response);
          alert('Trader registration successful!');

          this.authService.redirectBasedOnRole(response.accessToken);
        },
        error: (error) => {
          console.error('Trader Registration Error:', error);
          alert('Trader registration failed. Please try again.');
        },
      });
    } else {
      if (this.currentStep === 1) {
        console.log('Step 1 Completed:', values);
        this.nextStep();
      } else {
        const name = values.businessName;
        const userRole = this.formTitle.toLowerCase() as 'lender' | 'collector';

        const userRegistrationPayload: UserRegistration = {
          name,
          email: values.email,
          password: values.password,
          role: userRole,
          additionalInfo: {
            businessName: values.businessName,
            certificate: values.certificate,
            region: values.region,
          },
        };

        console.log('Payload:', userRegistrationPayload);

        this.authApiService.createUser(userRegistrationPayload).subscribe({
          next: (response: AuthResponse) => {
            console.log('Registration Successful:', response);
            this.authService.redirectBasedOnRole(response.accessToken);
          },
          error: (error) => {
            console.error('Registration Error:', error);
            this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
          },
        });
      }
    }
  }

}
