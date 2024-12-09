import { Component, OnInit } from '@angular/core';
import { OpenLoanBundlesService } from '../../../services/open-loan-bundles.service';

@Component({
  selector: 'app-open-trades',
  templateUrl: './open-trades.component.html',
  styleUrls: ['./open-trades.component.css'],
})
export class OpenTradesComponent implements OnInit {
  loanBundles: any[] = [];

  constructor(private openLoanBundlesService: OpenLoanBundlesService) {}

  ngOnInit(): void {
    this.openLoanBundlesService.getOpenLoanBundles().subscribe((data) => {
      this.loanBundles = data;
    });
  }

  investInBundle(bundleId: string): void {
    console.log(`Investing in bundle: ${bundleId}`);
  }
}
