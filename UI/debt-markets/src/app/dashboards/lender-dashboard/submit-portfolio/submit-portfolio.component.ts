import { Component, Input, OnInit } from '@angular/core';
import { LenderDashboardAPIService } from '../../../services/lender-dashboard.service';

@Component({
  selector: 'app-submit-portfolio',
  templateUrl: './submit-portfolio.component.html',
  styleUrl: './submit-portfolio.component.css'
})
export class SubmitPortfolioComponent implements OnInit{

  constructor(private dashboardService: LenderDashboardAPIService) {}
  @Input() formTitle: string = '';

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
    }
  ];
  ngOnInit(): void {
    if (this.formTitle === 'lender' || 
      this.formTitle === 'collector' ||
       this.formTitle === 'trader') {
        this.formTitle = 'NPL Portfolio Form';

       }
  }


  onFormSubmit(formData: any) {
    console.log('Form Submitted:', formData);
    // Add logic to handle form submission, e.g., call an API.
  }
}
