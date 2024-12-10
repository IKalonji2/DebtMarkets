import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth-token';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private roleSubject = new BehaviorSubject<string | null>(null); // New subject for role
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  role$ = this.roleSubject.asObservable(); // Observable for role

  constructor(private router: Router, private http: HttpClient) {}

  storeToken(token: string): void {
    console.log('Storing token:', token);  // Debugging
    document.cookie = `${this.tokenKey}=${token}; path=/`;  // Store token in cookie
    this.isLoggedInSubject.next(true);
    this.updateRole(); // Update role whenever the token is stored
  }

  getToken(): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + this.tokenKey + '=([^;]+)'));
    console.log('Retrieved token:', match ? match[2] : null);  // Debugging
    return match ? match[2] : null;
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token) as any;
      return decodedToken.role || null;
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }

  // Update the role subject whenever the role changes
  updateRole(): void {
    const role = this.getRole();
    this.roleSubject.next(role);
  }

  isAuthenticated(): boolean {
    const isAuth = !!this.getRole();
    this.isLoggedInSubject.next(isAuth);
    return isAuth;
  }

  redirectBasedOnRole(accessToken: string): void {
    try {
      this.storeToken(accessToken);
      const role = this.getRole();
      this.updateRole(); // Update role when login happens
      switch (role) {
        case 'collector':
          this.router.navigate(['/collector-dashboard']);
          break;
        case 'lender':
          this.router.navigate(['/lender-dashboard']);
          break;
        case 'trader':
          this.router.navigate(['/trader-dashboard']);
          break;
        default:
          throw new Error(`Unknown role: ${role}`);
      }
    } catch (error) {
      console.error('Error redirecting based on role:', error);
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    document.cookie = `${this.tokenKey}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    this.isLoggedInSubject.next(false);
    this.roleSubject.next(null); // Reset role on logout
    this.router.navigate(['/login']);
  }
}
