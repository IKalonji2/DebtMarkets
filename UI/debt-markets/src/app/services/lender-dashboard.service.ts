import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LenderDashboardAPIService {
  apiUrl: string = environment.API_URL;

  constructor(
    private http: HttpClient,
    private authService : AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken()
    console.log("in the frontend , the token", token)
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
 

  getPortfolios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/lender/portfolios`, {
      headers: this.getAuthHeaders(),
    });
  }

  getAuctions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auctions`, {
      headers: this.getAuthHeaders(),
    });
  }

  startAuction(auctionData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auctions`, auctionData, {
      headers: this.getAuthHeaders(),
    });
  }

  fetchOverview(): Observable<any> {
    return this.http.get(`${this.apiUrl}/lender/overview`, {
      headers: this.getAuthHeaders(),
    });
  }
  getEarnings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/earnings`, {
      headers: this.getAuthHeaders(),
    });
  }
  evaluateLoanBook(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/evaluate-loan-book`, formData, {
      headers: this.getAuthHeaders(),
    });
  }
}
