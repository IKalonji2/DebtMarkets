import { Component, HostListener, OnInit } from '@angular/core';
import { LenderDashboardAPIService } from '../../services/lender-dashboard.service';

@Component({
  selector: 'app-lender-dashboard',
  templateUrl: './lender-dashboard.component.html',
  styleUrls: ['./lender-dashboard.component.css'],
})
export class LenderDashboardComponent implements OnInit {
  sideNavItems = [
    { label: 'Overview', link: '/lender-dashboard/overview' },
    { label: 'Submit Portfolio', link: '/lender-dashboard/submit-portfolio' },
    { label: 'On Auction', link: '/lender-dashboard/on-auction' },
    { label: 'Closed', link: '/lender-dashboard/closed' }
  ];
  
  isMobileView = false;

  portfolios: any[] = [];

  constructor(private lenderService: LenderDashboardAPIService) {}

  @HostListener('window:resize', [])
  onResize() {
    this.checkMobileView();
  }

  ngOnInit() {
    this.checkMobileView();
  
    this.lenderService.getPortfolios().subscribe({
      next: (data) => {
        this.portfolios = data;
        console.log('Portfolios:', this.portfolios);
      },
      error: (error) => {
        console.error('Error loading portfolios:', error);
      },
    });
  }
  
  

  private checkMobileView() {
    this.isMobileView = window.innerWidth <= 768;
  }
  startAuction(portfolioId: number): void {
    console.log('Starting auction for portfolio:', portfolioId);
    // Add your auction starting logic here
  }
}
