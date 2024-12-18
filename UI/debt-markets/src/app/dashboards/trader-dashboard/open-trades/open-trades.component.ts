import { Component, OnInit } from '@angular/core';
import { OpenLoanBundlesService } from '../../../services/open-loan-bundles.service';
import { Trade } from '../../../models/trade.model';

@Component({
  selector: 'app-open-trades',
  templateUrl: './open-trades.component.html',
  styleUrls: ['./open-trades.component.css'],
})
export class OpenTradesComponent implements OnInit {
  trades: Trade[] = [];

  constructor(private openLoanBundlesService: OpenLoanBundlesService) {}

  ngOnInit(): void {
    this.openLoanBundlesService.getOpenLoanBundlesForTrader().subscribe((data:Trade[]) => {
      this.trades = data;
    });
  }

  investInBundle(bundleId: string): void {
    console.log(`Investing in bundle: ${bundleId}`);
  }
}
