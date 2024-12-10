import { Component, Input, OnInit } from '@angular/core';
import { LenderDashboardAPIService } from '../../../services/lender-dashboard.service';

@Component({
  selector: 'app-submit-portfolio',
  templateUrl: './submit-portfolio.component.html',
  styleUrls: ['./submit-portfolio.component.css']
})
export class SubmitPortfolioComponent implements OnInit {
  @Input() formTitle: string = '';
  selectedFile: File | null = null;

  formConfig = [
    {
      name: 'bookName',
      label: 'Book Name',
      type: 'text',
      errorMessage: 'Book Name is required',
      validators: ['required']
    },
    {
      name: 'totalAmount',
      label: 'Outstanding Amount',
      type: 'number',
      errorMessage: 'Outstanding Amount is required',
      validators: ['required', 'min:1']
    },
    {
      name: 'borrowersCount',
      label: 'Number of Borrowers',
      type: 'number',
      errorMessage: 'Number of Borrowers is required',
      validators: ['required', 'min:1']
    },
    {
      name: 'loanBook',
      label: 'Upload Loan Book (CSV)',
      type: 'file',
      accept: '.csv',
      errorMessage: 'Please upload a valid CSV file',
      validators: ['required']
    }
  ];

  constructor(private dashboardService: LenderDashboardAPIService) {}

  ngOnInit(): void {
    localStorage.removeItem('formTitle');
    this.formTitle = 'NPL Portfolio Form';
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onFormSubmit(formData: any): void {
    if (this.selectedFile) {
      const formDataWithFile = new FormData();
      formDataWithFile.append('file', this.selectedFile, this.selectedFile.name); 
      formDataWithFile.append('bookName', formData.bookName); 
      formDataWithFile.append('totalAmount', formData.totalAmount);
      formDataWithFile.append('borrowersCount', formData.borrowersCount); 
  
      this.dashboardService.evaluateLoanBook(formDataWithFile).subscribe(
        (response) => {
          console.log('Loan book evaluated:', response);
          this.selectedFile = null;
          formData.bookName = '';
          formData.totalAmount = '';
          formData.borrowersCount = '';
        },
        (error) => {
          console.error('Error submitting loan book:', error);
        }
      );
    } else {
      console.error('No file selected!');
    }
  }
  
}
 