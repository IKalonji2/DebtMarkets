import { Component, OnInit } from '@angular/core';
import { CollectorDashboardService } from '../../../services/collector-dashboard.service';
import { Bid } from '../../../models/collector.models'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bid-history',
  templateUrl: './bid-history.component.html',
  styleUrls: ['./bid-history.component.css']
})
export class BidHistoryComponent implements OnInit {
  bids: Bid[] = [];  // Declare bids array
  filters: any = {  // Filter object to store user input
    portfolioId: '',
    minBidAmount: null,
    maxBidAmount: null,
    status: ''
  };

  constructor(private bidHistoryService: CollectorDashboardService, private route: ActivatedRoute) {}

  ngOnInit() {
    // this.loadBids();
    this.fetchBidsByCollectorId();
  }

  // loadBids() {
  //   this.bidHistoryService.getBidHistory().subscribe(
  //     (data:any) => {
  //       this.bids = data; 
  //       console.log(this.bids)
  //     },
  //     (error:any) => {
  //       console.error('Error fetching bid data', error);
  //  });
  // }

  fetchBidsByCollectorId(): void {
    this.bidHistoryService.getCollectorBidHistory().subscribe(
      (data) => {
        this.bids = data;
        console.log('Bids for auction ID:', data);
      },
      (error) => {
        console.error('Error fetching bids:', error);
      }
    );
  }

  applyFilters() {
    let filteredBids = this.bids;

    if (this.filters.portfolioId) {
      filteredBids = filteredBids.filter(bid => bid.portfolioId.includes(this.filters.portfolioId));
    }

    if (this.filters.minBidAmount) {
      filteredBids = filteredBids.filter(bid => bid.bidAmount >= this.filters.minBidAmount);
    }

    if (this.filters.maxBidAmount) {
      filteredBids = filteredBids.filter(bid => bid.bidAmount <= this.filters.maxBidAmount);
    }

    if (this.filters.status) {
      filteredBids = filteredBids.filter(bid => bid.status === this.filters.status);
    }

    this.bids = filteredBids;
  }
}
