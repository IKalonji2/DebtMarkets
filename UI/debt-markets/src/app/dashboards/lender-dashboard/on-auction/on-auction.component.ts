import { Component, OnInit } from '@angular/core';
import { LenderDashboardAPIService } from '../../../services/lender-dashboard.service';

@Component({
  selector: 'app-on-auction',
  templateUrl: './on-auction.component.html',
  styleUrls: ['./on-auction.component.css']
})
export class OnAuctionComponent implements OnInit {
  portfoliosOnAuction: any[] = [];
  errorMessage: string | undefined;

  constructor(private lenderService: LenderDashboardAPIService) {}

  ngOnInit(): void {
    this.fetchActiveAuctions();
  }

  fetchActiveAuctions(): void {
    this.lenderService.getActiveAuctions().subscribe(
      (data) => {
        console.log('Received open auctions data:', data);
        this.portfoliosOnAuction = data;
      },
      (error) => {
        console.error('Error fetching open auctions', error);
        this.errorMessage = 'Error fetching open auctions data';
      }
    );
  }
}
