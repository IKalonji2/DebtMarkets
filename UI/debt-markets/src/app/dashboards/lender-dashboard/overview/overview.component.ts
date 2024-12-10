import { Component, OnInit } from '@angular/core';
import { LenderDashboardAPIService } from '../../../services/lender-dashboard.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  portfolios: any[] = [];
  overview: any = null;
  loading: boolean = false;
  errorMessage: string = '';
  earnings: any;

  constructor(private lenderService: LenderDashboardAPIService) {}

  ngOnInit(): void {
    this.fetchOverview();
    this.fetchEarnings();
  }

  private loadPortfolios(): void {
    this.lenderService.getPortfolios().subscribe(
      (data) => {
        this.portfolios = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching portfolios.';
        console.error('Error fetching portfolios:', error);
      }
    );
  }

  startAuction(portfolioId: number): void {
    const auctionData = {
      portfolioId,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week later
    };
  
    this.lenderService.startAuction(auctionData).subscribe(
      (data) => {
        console.log('Auction started:', data);
        this.loadPortfolios();  // Refresh portfolios after starting auction
      },
      (error) => {
        console.error('Error starting auction:', error);
      }
    );
  }

  fetchOverview(): void {
    this.loading = true;
    this.lenderService.fetchOverview().subscribe(
      (data) => {
        console.log('Received overview data:', data);
        this.loading = false;
        this.overview = data;
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching overview', error);
        this.errorMessage = 'Error fetching overview data';
      }
    );
  } 

  fetchEarnings(): void {
    this.lenderService.getEarnings().subscribe(
      (data) => {
        this.earnings = data;
      },
      (error) => {
        console.error('Error fetching earnings:', error);
      }
    );
  }
}
