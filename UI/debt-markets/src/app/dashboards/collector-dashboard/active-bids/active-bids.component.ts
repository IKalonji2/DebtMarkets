import { Component } from '@angular/core';

@Component({
  selector: 'app-active-bids',
  templateUrl: './active-bids.component.html',
  styleUrl: './active-bids.component.css'
})
export class ActiveBidsComponent {
  activeBids = [
    { bidId: 1, portfolioName: 'Portfolio A', status: 'Active' },
    { bidId: 2, portfolioName: 'Portfolio B', status: 'Active' },
    { bidId: 3, portfolioName: 'Portfolio C', status: 'Active' },
  ];

}
