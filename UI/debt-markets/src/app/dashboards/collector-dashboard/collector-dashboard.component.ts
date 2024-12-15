import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-collector-dashboard',
  templateUrl: './collector-dashboard.component.html',
  styleUrl: './collector-dashboard.component.css'
})
export class CollectorDashboardComponent implements OnInit{
  
  sideNavItems = [
    { label: 'Overview', link: '/collector-dashboard/overview' },
    { label: 'Recoveries', link: '/collector-dashboard/recoveries' },
    { label: 'Active Bids', link: '/collector-dashboard/active-bids' },
    { label: 'Tokens', link: '/collector-dashboard/tokens' },
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
