import { Component, OnInit } from '@angular/core';
import { LenderDashboardAPIService } from '../../../services/lender-dashboard.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  portfolios: any[] = [];
  overview: any = null;
  loading: boolean = false;
  errorMessage: string = '';
  earnings: any;

  constructor(private lenderService: LenderDashboardAPIService) {}

  ngOnInit(): void {
    this.fetchOverview();
    this.fetchEarnings();
  }

  private loadPortfolios(): void {
    this.lenderService.getPortfolios().subscribe(
      (data) => {
        this.portfolios = data;
        console.log(this.portfolios)
      },
      (error) => {
        this.errorMessage = 'Error fetching portfolios.';
        console.error('Error fetching portfolios:', error);
      }
    );
  }

  fetchOverview(): void {
    this.loading = true;
    this.lenderService.fetchOverview().subscribe(
      (data) => {
        console.log('Received overview data:', data);
        this.loading = false;
        this.overview = data;
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching overview', error);
        this.errorMessage = 'Error fetching overview data';
      }
    );
  } 

  fetchEarnings(): void {
    this.lenderService.getEarnings().subscribe(
      (data) => {
        this.earnings = data;
      },
      (error) => {
        console.error('Error fetching earnings:', error);
      }
    );
  }
}
