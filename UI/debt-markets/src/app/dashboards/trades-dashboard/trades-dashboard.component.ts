import { Component } from '@angular/core';
import { LoanBundle } from '../../models/loan-bundle.model';
import { OpenLoanBundlesService } from '../../services/open-loan-bundles.service';

@Component({
  selector: 'app-trades-dashboard',
  templateUrl: './trades-dashboard.component.html',
  styleUrl: './trades-dashboard.component.css'
})
export class TradesDashboardComponent {
  loanBundles: LoanBundle[] = [];

  constructor(private openLoanBundlesService: OpenLoanBundlesService) {}

  ngOnInit() {
    this.openLoanBundlesService.getOpenLoanBundles().subscribe((data) => {
      this.loanBundles = data;
    });
  }

  investInBundle(bundleId: string) {
    // Logic to invest in the selected loan bundle, e.g., navigate to an investment form or trigger an investment API call
    console.log(`Investing in bundle: ${bundleId}`);
  }

}
