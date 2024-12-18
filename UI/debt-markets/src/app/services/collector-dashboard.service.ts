import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth-service/auth.service';
import { Recovery, Token, Bid } from '../models/collector.models';

@Injectable({
  providedIn: 'root',
})
export class CollectorDashboardService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getPerformanceMetrics(): Observable<{ title: string; value: string }[]> {
    return this.http
      .get<{ title: string; value: string }[]>(`${this.apiUrl}/collector/overview`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  getActiveBids(): Observable<Bid[]> {
    return this.http
      .get<Bid[]>(`${this.apiUrl}/collector/active-bids`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  placeBid(bidId: string, amount: number): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/collector/place-bid`, { bidId, amount }, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  cancelBid(bidId: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/collector/cancel-bid/${bidId}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  getRecoveriesData(): Observable<Recovery[]> {
    return this.http
      .get<Recovery[]>(`${this.apiUrl}/collector/progress`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  uploadRecoveryReport(file: File, amountRecovered: number, portfolioId: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('amountRecovered', amountRecovered.toString());
    formData.append('portfolioId', portfolioId.toString());

    return this.http
      .post<any>(`${this.apiUrl}/collector/update-recovery`, formData, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  tokenizeReport(portfolioId: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/collector/tokenize`, { portfolioId }, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  createTrade(tradeData: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/collector/create-trade`, tradeData, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  getCollectorBidHistory(): Observable<Bid[]> {
    return this.http
      .get<Bid[]>(`${this.apiUrl}/collector/bids`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  getOwnedTokens(): Observable<Token[]> {
    return this.http
      .get<Token[]>(`${this.apiUrl}/collector/tokens`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  getValueTrends(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/collector/trends`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('API call failed:', error);
    return throwError(() => new Error('An error occurred while processing the request.'));
  }
}
