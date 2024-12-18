import { Component, OnInit } from '@angular/core';
import { Trade } from '../../models/trade.model';
import { OpenLoanBundlesService } from '../../services/open-loan-bundles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trades-dashboard',
  templateUrl: './trades-dashboard.component.html',
  styleUrls: ['./trades-dashboard.component.css'],
})
export class TradesDashboardComponent implements OnInit {
  trades: Trade[] = [];
  constructor(
    private openLoanBundlesService: OpenLoanBundlesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.openLoanBundlesService.getAllOpenLoanBundles().subscribe((data: Trade[]) => {
      this.trades = data;
    });
  }

  selectTrade(trade: Trade): void {
    console.log('Selected trade:', trade);
    this.router.navigate(['/trade-detail', trade.bundleId]);
  }
}
