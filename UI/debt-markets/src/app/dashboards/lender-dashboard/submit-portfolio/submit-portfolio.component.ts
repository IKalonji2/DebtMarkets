import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LenderDashboardAPIService } from '../../../services/lender-dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-portfolio',
  templateUrl: './submit-portfolio.component.html',
  styleUrls: ['./submit-portfolio.component.css']
})
export class SubmitPortfolioComponent implements OnInit {
  @Input() formTitle: string = '';
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFile: File | null = null;
  loading = false;
  currentStep = 0; // Track the current step
  steps = [
    { label: 'Uploading Loan Book', completed: false },
    { label: 'Evaluating Loan Book', completed: false },
    { label: 'Approving Loan Book', completed: false },
    { label: 'Completed', completed: false }
  ];

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
  

  constructor(
    private dashboardService: LenderDashboardAPIService,
    private router: Router
  ) {}

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
    if (!this.selectedFile) {
      console.error('No file selected!');
      return;
    }
  
    this.loading = true;
    this.steps[this.currentStep].completed = true; 
  
    const formDataWithFile = new FormData();
    formDataWithFile.append('file', this.selectedFile, this.selectedFile.name);
    formDataWithFile.append('bookName', formData.bookName);
    formDataWithFile.append('totalAmount', formData.totalAmount);
  
    this.dashboardService.evaluateLoanBook(formDataWithFile).subscribe(
      (response) => {
        this.currentStep = 1;
        this.steps[this.currentStep].completed = true;
  
        setTimeout(() => {
          this.currentStep = 2;
          this.steps[this.currentStep].completed = true;
  
          setTimeout(() => {
            this.currentStep = 3;
            this.steps[this.currentStep].completed = true;
            this.loading = false;
            this.router.navigate(['/lender-dashboard/overview'])
  
            // Clear form and file
            formData.bookName = '';
            formData.totalAmount = '';
            this.selectedFile = null;
          }, 2000);
        }, 3000);
      },
      (error) => {
        console.error('Error submitting loan book:', error.error);
        this.loading = false;
      }
    );
  }
  
  
}
