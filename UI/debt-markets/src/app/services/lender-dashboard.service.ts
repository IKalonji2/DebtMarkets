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
    console.log(`${this.apiUrl}/lender/portfolios`);
    return this.http.get(`${this.apiUrl}/lender/portfolios`, {
      headers: this.getAuthHeaders(),
    });
  }

  getActiveAuctions():Observable<any>  {
    return this.http.get(`${this.apiUrl}/lender/auctions-active`, {
      headers: this.getAuthHeaders(),
    });
  }

  getClosedAuctions() {
    return this.http.get<any[]>(`${this.apiUrl}/lender/auctions-closed`, {
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
    return this.http.post(`${this.apiUrl}/lender/evaluate-loan-book`, formData, {
      headers: this.getAuthHeaders(),
    });
  }
  tokenizePortfolio(portfolioId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/lender/tokenize`, { portfolioId,
      // headers: this.getAuthHeaders(),
     });
    
  }

  putUpForAuction(portfolioId: string): Observable<any> {
    console.log(portfolioId);
    
    return this.http.post(`${this.apiUrl}/lender/auction`, { portfolioId,     
      headers: this.getAuthHeaders(),
     });
  }
}
