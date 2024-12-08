import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-trading-view',
  templateUrl: './trading-view.component.html',
  styleUrl: './trading-view.component.css'
})
export class TradingViewComponent {
  sideNavItems = [
    { label: 'Overview', link: '/investment-overview' },
    { label: 'Trades', link: '/portfolio-trades' },
    { label: 'Tokens', link: '/tokens' },
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
    this.isMobileView = window.innerWidth <= 768;
  }
}
