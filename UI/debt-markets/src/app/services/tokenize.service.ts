import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth-service/auth.service';

@Injectable({ providedIn: 'root' })
export class TokenizeService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  apiUrl: string = environment.API_URL;
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  tokenizeDocument(documentId: number, documentType: string, totalValue: number, numTokens: number) {
    return this.http.post('/api/tokenize', {
      documentId,
      documentType,
      totalValue,
      numTokens,
      headers: this.getAuthHeaders(),
    });
  }
}
