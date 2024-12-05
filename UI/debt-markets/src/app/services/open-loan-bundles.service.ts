import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable, switchMap } from 'rxjs';
import { LoanBundle } from '../models/loan-bundle.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OpenLoanBundlesService {

  private apiUrl = environment.API_URL;


  constructor(private http: HttpClient) {}

  getOpenLoanBundles(): Observable<LoanBundle[]> {
    return interval(10000).pipe(  // Fetch every 10 seconds
      switchMap(() => this.http.get<LoanBundle[]>(`${this.apiUrl}/open-loan-bundles`))
    );
  }

}
