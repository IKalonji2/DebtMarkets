import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

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

  getOpenLoanBundles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/open-loan-bundles`, {
      headers: this.getAuthHeaders(),
    });
  }
}
