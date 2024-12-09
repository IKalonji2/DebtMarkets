import { Component, OnInit } from '@angular/core';
import { OpenLoanBundlesService } from '../../services/open-loan-bundles.service';

@Component({
  selector: 'app-trader-dashboard',
  templateUrl: './trader-dashboard.component.html',
  styleUrls: ['./trader-dashboard.component.css']
})
export class TraderDashboardComponent implements OnInit {
  loanBundles: any[] = [];

  sideNavItems = [
    { label: 'Overview', link: '/trader-dashboard/overview' },
    { label: 'Tokens', link: '/trader-dashboard/tokens' },
    { label: 'Open Trades', link: '/trader-dashboard/open-trades' },
    { label: 'Investments', link: '/trader-dashboard/investments' },
  ];

  isMobileView: boolean = false;

  constructor(private openLoanBundlesService: OpenLoanBundlesService) {}

  ngOnInit(): void {
    // Fetch open loan bundles
    this.openLoanBundlesService.getOpenLoanBundles().subscribe((data) => {
      this.loanBundles = data;
    });
  }

  investInBundle(bundleId: string): void {
    // Handle the invest logic
    console.log(`Investing in bundle with ID: ${bundleId}`);
  }
}
