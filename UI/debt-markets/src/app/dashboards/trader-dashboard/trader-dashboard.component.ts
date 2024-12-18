import { Component, HostListener, OnInit } from '@angular/core';
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

  @HostListener('window:resize', [])
  onResize() {
    this.checkMobileView();
  }

  constructor(private openLoanBundlesService: OpenLoanBundlesService) {}

  ngOnInit(): void {
    this.checkMobileView();

    // Fetch open loan bundles
    this.openLoanBundlesService.getAllOpenLoanBundles().subscribe((data:any) => {
      this.loanBundles = data;
    });
  }

  investInBundle(bundleId: string): void {
    // Handle the invest logic
    console.log(`Investing in bundle with ID: ${bundleId}`);
  }

  private checkMobileView() {
    this.isMobileView = window.innerWidth <= 768;
  }
}
