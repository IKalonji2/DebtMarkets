import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LenderDashboardAPIService {
  submitNPLBook(formData: any) {
    throw new Error('Method not implemented.');
  }
  URL: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  getDashboardData(role: string) {
    const route = `/dashboard/${role}`;
    return this.http.get(`${this.URL}${route}`);
  }
  getOverviewStats(role: string) {
    const route = `/dashboard/${role}`;
    return this.http.get(`${this.URL}${route}`);
  }
  // Submit debt portfolio for lender
  submitDebtPortfolio(formData: FormData) {
    const route = '/lender/submit-portfolio';
    return this.http.post(`${this.URL}${route}`, formData);
  }

  // Evaluate debt portfolio (lender-specific)
  evaluateDebtPortfolio(portfolioId: string) {
    const route = '/debt-markets/evaluate-portfolio';
    return this.http.post(`${this.URL}${route}`, { portfolioId });
  }

  // Create tokenized debt bundle (lender-specific)
  createTokenizedDebtBundle(portfolioId: string) {
    const route = '/debt-markets/create-rwa-token';
    return this.http.post(`${this.URL}${route}`, { portfolioId });
  }

  // Confirm debt portfolio listed (lender-specific)
  confirmDebtPortfolioListed(portfolioId: string) {
    const route = '/debt/confirm-listing';
    return this.http.post(`${this.URL}${route}`, { portfolioId });
  }

  // Fetch auction data for trader
  getAuctionData() {
    const route = '/trader/auctions';
    return this.http.get(`${this.URL}${route}`);
  }

  // Submit bid for trader
  submitBid(auctionId: string, bidAmount: number) {
    const route = '/trader/submit-bid';
    return this.http.post(`${this.URL}${route}`, { auctionId, bidAmount });
  }

  // Fetch debt collection tasks for collector
  getDebtCollectionTasks() {
    const route = '/collector/tasks';
    return this.http.get(`${this.URL}${route}`);
  }

  // Update debt collection status for collector
  updateCollectionStatus(taskId: string, status: string) {
    const route = '/collector/update-task';
    return this.http.put(`${this.URL}${route}`, { taskId, status });
  }
}
