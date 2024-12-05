import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AuthResponse } from '../../models/auth-response.model';
import { UserLogin } from '../../models/user-login';
import { AuthAPIService } from '../../services/auth-service/auth-api.service';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
      errorMessage: 'Password is required'
    }
  ];

  errorMessage: string = '';  // For error feedback
  constructor(private authApiService: AuthAPIService, private authService: AuthService) {}

  handleFormSubmit(values: any): void {
    console.log('Form Submitted:', values);
    const userLoginPayload: UserLogin = {
      email: values.email,
      password: values.password,
    };

    this.authApiService.loginUser(userLoginPayload).subscribe({
      next: (response: AuthResponse) => {
        console.log('Login Successful:', response);
        this.authService.redirectBasedOnRole(response.accessToken);
      },
      error: (error) => {
        console.error('Login Error:', error);
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      },
    });
  }
}
