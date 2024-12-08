import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-closed-auctions',
  templateUrl: './closed-auctions.component.html',
  styleUrls: ['./closed-auctions.component.css']
})
export class ClosedAuctionsComponent implements OnInit {
  closedPortfolios: any[] = []; // Define the property

  ngOnInit(): void {
    // Fetch or mock data for closed portfolios
    this.closedPortfolios = [
      { name: 'Portfolio 1', status: 'Sold' },
      { name: 'Portfolio 2', status: 'Expired' },
    ];
  }
}