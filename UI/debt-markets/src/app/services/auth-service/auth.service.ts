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

  redirectBasedOnRole(token: string): void {
    try {
      const decodedToken: any = jwtDecode(token);
      const role = decodedToken.role;

      this.storeToken(token);

      switch (role) {
        case 'lender':
          this.router.navigate(['/lender-dashboard']);
          break;
        case 'collector':
          this.router.navigate(['/collection-agent-dashboard']);
          break;
        case 'trader':
          this.router.navigate(['/trader-dashboard']);
          break;
        default:
          this.router.navigate(['/']);
      }
    } catch (error) {
      console.error('Error decoding JWT:', error);
      this.logout();
    }
  }
}
