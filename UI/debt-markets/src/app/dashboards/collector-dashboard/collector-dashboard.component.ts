import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-collector-dashboard',
  templateUrl: './collector-dashboard.component.html',
  styleUrl: './collector-dashboard.component.css'
})
export class CollectorDashboardComponent implements OnInit{
  
  sideNavItems = [
    { label: 'Dashboard', link: '/collector-dashboard/overview', icon: 'dashboard' },
    { label: 'Bidding', link: '/collector-dashboard/active-bids', icon: 'gavel' },
    { label: 'Recoveries', link: '/collector-dashboard/recoveries', icon: 'sync_alt' },
    { label: 'My Portfolio', link: '/collector-dashboard/my-portfolio', icon: 'account_balance_wallet' },
    { label: 'Bid History', link: '/collector-dashboard/bid-history', icon: 'history' },
    { label: 'Notifications', link: '/collector-dashboard/notifications', icon: 'notifications' },
  ];

  isMobileView: boolean = false;

  @HostListener('window:resize', [])
  onResize() {
    this.checkMobileView();
  }

  ngOnInit(): void {
    this.checkMobileView();
  }

  private checkMobileView() {
    this.isMobileView = window.innerWidth <= 768;
  }

}
