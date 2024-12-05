import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth-token';

  constructor(private router: Router, private http: HttpClient) {}

  storeToken(token: string): void {
    document.cookie = `${this.tokenKey}=${token}; path=/`;
  }

  getToken(): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + this.tokenKey + '=([^;]+)'));
    return match ? match[2] : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    document.cookie = `${this.tokenKey}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    this.router.navigate(['/login']);
  }
  redirectBasedOnRole(accessToken: string): void {
    try {
      const decodedToken = jwtDecode(accessToken) as any;
      console.log('Decoded Token:', decodedToken);
      const role = decodedToken.role;
      console.log('Role:', role);

      if (role === 'collector') {
        this.router.navigate(['/collector-dashboard']);
      } else if (role === 'lender') {
        this.router.navigate(['/lender-dashboard']);
      } else if (role === 'trader') {
        console.log(role === 'trader');
        this.router.navigate(['/trader-dashboard']);
      } else {
        throw new Error(`Unknown role: ${role}`);
      }
    } catch (error) {
      console.error('Error decoding JWT:', error);
      this.router.navigate(['/login']);
    }
  }

  // redirectBasedOnRole(accessToken: string): void {
  //   try {
  //     const decodedToken = jwtDecode(accessToken) as any; // Ensure jwtDecode is working correctly
  //     const role = decodedToken.role;

  //     if (role === 'collector') {
  //       this.router.navigate(['/collector-dashboard']);
  //     } else if (role === 'lender') {
  //       this.router.navigate(['/lender-dashboard']);
  //     } else if (role === 'trader') {
  //       this.router.navigate(['/trader-dashboard']);
  //     } else {
  //       throw new Error('Unknown role');
  //     }
  //   } catch (error) {
  //     console.error('Error decoding JWT:', error);
  //     this.router.navigate(['/login']);
  //   }
  // }
}
