import { Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  overviewData = {
    totalAmountInvested: 100000,
    totalReturn: 20000,
    remainingAmount: 80000,
  };

}
