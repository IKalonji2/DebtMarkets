import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth-token';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private roleSubject = new BehaviorSubject<string | null>(null);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  role$ = this.roleSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {}

  storeToken(token: string): void {
    document.cookie = `${this.tokenKey}=${token}; path=/`;
    this.isLoggedInSubject.next(true);
    this.updateRole();
  }

  getToken(): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + this.tokenKey + '=([^;]+)'));
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
      this.updateRole();
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
    this.roleSubject.next(null);
    this.router.navigate(['/login']);
  }

  getTraderDetails(): Observable<any> {
    return this.http.get<any>('/api/trader/details'); 
  }

  getTraderBalance(): Observable<number> {
    return this.http.get<number>('/api/trader/balance');
  }
}
