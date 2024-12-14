import { Component, OnInit } from '@angular/core';
import { LenderDashboardAPIService } from '../../../services/lender-dashboard.service';

@Component({
  selector: 'app-closed-auctions',
  templateUrl: './closed-auctions.component.html',
  styleUrls: ['./closed-auctions.component.css']
})
export class ClosedAuctionsComponent implements OnInit {
  closedPortfolios: any[] = [];
  errorMessage: string | undefined;

  constructor(private lenderService: LenderDashboardAPIService) {}

  ngOnInit(): void {
    // Fetch or mock data for closed portfolios
    // this.closedPortfolios = [
    //   { name: 'Portfolio 1', status: 'Sold' },
    //   { name: 'Portfolio 2', status: 'Expired' },
    // ];
    this.fetchClosedAuctions
  }
  fetchClosedAuctions(): void {
    this.lenderService.getClosedAuctions().subscribe(
      (data: any[]) => {
        console.log('Received closed auctions data:', data);
        this.closedPortfolios = data;
      },
      (error) => {
        console.error('Error fetching open auctions', error);
        this.errorMessage = 'Error fetching open auctions data';
      }
    );
  }
}