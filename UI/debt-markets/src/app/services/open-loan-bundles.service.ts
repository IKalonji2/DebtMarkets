import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Trade } from '../models/trade.model';

@Injectable({
  providedIn: 'root',
})
export class OpenLoanBundlesService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getAllOpenLoanBundles(): Observable<Trade[]> {
    return this.http.get<Trade[]>(`${this.apiUrl}/`, {
      headers: this.getAuthHeaders(),
    });
  }

  getOpenLoanBundlesForTrader(): Observable<Trade[]> {
    return this.http.get<any[]>(`${this.apiUrl}/trader`, {
      headers: this.getAuthHeaders(),
    });
  }

  getLoanBundleById(bundleId: string): Observable<Trade[]> {
    return this.http.get<any>(`${this.apiUrl}/${bundleId}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
