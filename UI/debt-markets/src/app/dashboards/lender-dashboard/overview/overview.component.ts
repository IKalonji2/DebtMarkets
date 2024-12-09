import { Component, OnInit } from '@angular/core';
import { LenderDashboardAPIService } from '../../../services/lender-dashboard.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit {
  portfolios: any[] = [];

  constructor(private lenderService: LenderDashboardAPIService) {}

  ngOnInit(): void {
    this.loadPortfolios();
  }

  private loadPortfolios(): void {
    this.lenderService.getPortfolios().subscribe(
      (data) => {
        this.portfolios = data;
      },
      (error) => {
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
        this.loadPortfolios(); // Refresh data
      },
      (error) => {
        console.error('Error starting auction:', error);
      }
    );
  } 

}
