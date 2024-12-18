import { Component, HostListener, OnInit } from '@angular/core';
import { LenderDashboardAPIService } from '../../services/lender-dashboard.service';

@Component({
  selector: 'app-lender-dashboard',
  templateUrl: './lender-dashboard.component.html',
  styleUrls: ['./lender-dashboard.component.css'],
})
export class LenderDashboardComponent implements OnInit {
  sideNavItems = [
    { label: 'Dashboard', link: '/lender-dashboard/overview' },
    { label: 'Submit Portfolio', link: '/lender-dashboard/submit-portfolio' },
    { label: 'On Auction', link: '/lender-dashboard/on-auction' },
    { label: 'Closed', link: '/lender-dashboard/closed' }
  ];
  
  isMobileView = false;

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkMobileView();
  }

  ngOnInit() {
    this.checkMobileView();
  }

  private checkMobileView() {
    this.isMobileView = window.innerWidth <= 768;
  }
  
}
