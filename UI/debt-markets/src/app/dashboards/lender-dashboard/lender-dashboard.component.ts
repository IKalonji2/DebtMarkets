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

  @HostListener('window:resize', [])
  onResize() {
    this.checkMobileView();
  }

  ngOnInit() {
    this.checkMobileView();
  }

  private checkMobileView() {
    this.isMobileView = window.innerWidth <= 768; // Adjust breakpoint as needed
  }
}
