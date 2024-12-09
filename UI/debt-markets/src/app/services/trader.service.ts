import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TraderService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getInvestments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/investments`, {
      headers: this.getAuthHeaders(),
    });
  }

  getTokens(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tokens`, {
      headers: this.getAuthHeaders(),
    });
  }

  investInBundle(bundleId: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/invest`,
      { bundleId },
      { headers: this.getAuthHeaders() }
    );
  }
  getOverviewStats(): Observable<OverviewStats> {
    return this.http.get<OverviewStats>(`${this.apiUrl}/overview-stats`); // Replace with actual API endpoint
  }
}

export interface OverviewStats {
  totalEarnings: number;
  riskExposure: string;
  totalInvestments: number;
  activeTrades: number;
  // Add other properties as needed
}