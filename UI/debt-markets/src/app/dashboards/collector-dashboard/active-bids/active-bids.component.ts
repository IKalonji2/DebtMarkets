import { Component, OnInit } from '@angular/core';
import { CollectorDashboardService } from '../../../services/collector-dashboard.service';

@Component({
  selector: 'app-active-bids',
  templateUrl: './active-bids.component.html',
  styleUrls: ['./active-bids.component.css']
})
export class ActiveBidsComponent implements OnInit {
  activeBids: any[] = []; 
  selectedBid: any | null = null;

  constructor(private collectorDashboardService: CollectorDashboardService) {}

  ngOnInit(): void {
    this.fetchActiveBids();
  }

  // Fetch all active bids
  fetchActiveBids(): void {
    this.collectorDashboardService.getActiveBids().subscribe({
      next: (bids) => (this.activeBids = bids),
      error: (error: any) => console.error('Error fetching active bids:', error),
    });
  }

  // View details of a specific bid
  viewBidDetails(bid: any): void {
    this.selectedBid = bid;
  }

  // Place a bid
  placeBid(bid: any): void {
    if (!bid) return;
    this.collectorDashboardService.placeBid(bid.id, bid.amount).subscribe({
      next: (response) => {
        console.log('Bid placed successfully:', response);
        this.fetchActiveBids(); // Refresh the bids
      },
      error: (error: any) => console.error('Error placing bid:', error),
    });
  }

  // Cancel a bid
  cancelBid(bid: any): void {
    if (!bid) return;
    this.collectorDashboardService.cancelBid(bid.id).subscribe({
      next: (response) => {
        console.log('Bid canceled successfully:', response);
        this.fetchActiveBids(); // Refresh the bids
      },
      error: (error: any) => console.error('Error canceling bid:', error),
    });
  }
}
