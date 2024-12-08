import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-on-auction',
  templateUrl: './on-auction.component.html',
  styleUrls: ['./on-auction.component.css']
})
export class OnAuctionComponent implements OnInit {
  portfoliosOnAuction: any[] = []; // Define the property

  ngOnInit(): void {
    // Fetch or mock data for portfolios on auction
    this.portfoliosOnAuction = [
      { name: 'Portfolio A', currentBid: '$10,000' },
      { name: 'Portfolio B', currentBid: '$12,500' },
    ];
  }
}
