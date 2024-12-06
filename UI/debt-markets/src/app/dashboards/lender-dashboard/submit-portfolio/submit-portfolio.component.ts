import { Component } from '@angular/core';
import { LenderDashboardAPIService } from '../../../services/lender-dashboard.service';

@Component({
  selector: 'app-submit-portfolio',
  templateUrl: './submit-portfolio.component.html',
  styleUrl: './submit-portfolio.component.css'
})
export class SubmitPortfolioComponent {
  constructor(private dashboardService: LenderDashboardAPIService) {}

  onSubmit(formData: any): void {
    this.dashboardService.submitDebtPortfolio(formData).subscribe((response) => {
      console.log('Book submitted successfully:', response);
    });
  }
}
