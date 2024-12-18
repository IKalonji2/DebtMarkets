import { Component, OnInit } from '@angular/core';
import { CollectorDashboardService } from '../../../services/collector-dashboard.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register Chart.js components globally

@Component({
  selector: 'app-my-portfolio',
  templateUrl: './my-portfolio.component.html',
  styleUrls: ['./my-portfolio.component.css']
})
export class MyPortfolioComponent implements OnInit {
  tokens: any[] = [];
  valueTrends: any[] = [];
  chart: any;

  constructor(private portfolioService: CollectorDashboardService) {}

  ngOnInit(): void {
    this.fetchTokens();
    this.fetchValueTrends();
  }

  fetchTokens() {
    this.portfolioService.getOwnedTokens().subscribe(
      (data: any) => {
        this.tokens = data;
      },
      (error) => {
        console.error("Error fetching tokens:", error);
      }
    );
  }

  fetchValueTrends() {
    this.portfolioService.getValueTrends().subscribe(
      (data: any) => {
        this.valueTrends = data;
        this.initializeChart(); // Initialize the chart once data is fetched
      },
      (error) => {
        console.error("Error fetching value trends:", error);
      }
    );
  }

  initializeChart() {
    const labels = this.valueTrends.map(trend => trend.date); // Extract dates
    const data = this.valueTrends.map(trend => trend.value); // Extract values

    const ctx = document.getElementById('portfolioChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line', // Chart type
      data: {
        labels: labels, // X-axis labels
        datasets: [
          {
            label: 'Portfolio Value',
            data: data,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4, // Smooth curves
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Value'
            }
          }
        }
      }
    });
  }
}
