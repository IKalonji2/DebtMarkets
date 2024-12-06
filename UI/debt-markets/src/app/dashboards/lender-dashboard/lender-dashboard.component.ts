import { Component, OnInit } from '@angular/core';
import { LenderDashboardAPIService } from '../../services/lender-dashboard.service';

@Component({
  selector: 'app-lender-dashboard',
  templateUrl: './lender-dashboard.component.html',
  styleUrls: ['./lender-dashboard.component.css'],
})
export class LenderDashboardComponent implements OnInit {
  debtPortfolioListed: boolean = false; // Tracks if the portfolio is listed
  isProcessing: boolean = false; // Tracks submission/evaluation process
  selectedFile: File | null = null; // Holds the selected file
  evaluationStatus: string | null = null; // AI evaluation status
  rwaToken: any = null; // Token data returned from the backend

  constructor(private dashboardService: LenderDashboardAPIService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardData('lender').subscribe((data) => {
      console.log('Dashboard Data:', data);
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile);
    }
  }

  submitDebtPortfolio(): void {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.isProcessing = true; // Start processing
    this.dashboardService.submitDebtPortfolio(formData).subscribe({
      next: (response) => {
        console.log('Portfolio Submitted:', response);
        this.isProcessing = false;
        // this.evaluationStatus = response.evaluationStatus;

        // Check if the portfolio was listed successfully
        // if (response.success) {
        //   this.debtPortfolioListed = true;
        //   this.rwaToken = response.rwaToken;
        }
      })
    //   error: (error) => {
    //     console.error('Error submitting portfolio:', error);
    //     this.isProcessing = false;
    //     this.evaluationStatus = 'Error evaluating the portfolio. Please try again.';
    //   },
    // });
  }
}
