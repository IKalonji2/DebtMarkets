import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  LineController,
  LineElement,
  BarController,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  BarController,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-trading-chart',
  templateUrl: './trading-chart.component.html',
  styleUrls: ['./trading-chart.component.css']
})
export class TradingChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  // Example loan book performance data
  performanceData = [
    { date: '2024-11-01', profitOrLoss: 1500, collectionRate: 70, investmentInterest: 10 },
    { date: '2024-11-02', profitOrLoss: -500, collectionRate: 50, investmentInterest: 5 },
    { date: '2024-11-03', profitOrLoss: 3000, collectionRate: 90, investmentInterest: 20 },
    { date: '2024-11-04', profitOrLoss: 2000, collectionRate: 85, investmentInterest: 15 },
    { date: '2024-11-05', profitOrLoss: -1000, collectionRate: 40, investmentInterest: 8 },
  ];

  ngAfterViewInit(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      const labels = this.performanceData.map(data => data.date);
      const profitOrLossData = this.performanceData.map(data => data.profitOrLoss);
      const collectionRateData = this.performanceData.map(data => data.collectionRate);
      const investmentInterestData = this.performanceData.map(data => data.investmentInterest);

      const chartConfig: ChartConfiguration = {
        type: 'bar', // Primary chart type
        data: {
          labels,
          datasets: [
            {
              type: 'line', // Profit/Loss as a line graph
              label: 'Profit/Loss ($)',
              data: profitOrLossData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              yAxisID: 'y1',
            },
            {
              type: 'line', // Collection Rate as bars
              label: 'Collection Rate (%)',
              data: collectionRateData,
              backgroundColor: 'rgba(255, 159, 64, 0.8)',
              yAxisID: 'y2',
            },
            {
              type: 'line', // Investment Interest as bars
              label: 'Investment Interest',
              data: investmentInterestData,
              backgroundColor: 'rgba(153, 102, 255, 0.8)',
              yAxisID: 'y2',
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date',
              },
            },
            y1: {
              type: 'linear',
              position: 'left',
              title: {
                display: true,
                text: 'Profit/Loss ($)',
              },
            },
            y2: {
              type: 'linear',
              position: 'right',
              title: {
                display: true,
                text: 'Collection Rate & Interest',
              },
              grid: {
                drawOnChartArea: false, // Avoid overlapping with y1 grid
              },
            },
          },
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },
        },
      };

      new Chart(ctx, chartConfig);
    }
  }
  isNavOpen = false;

  toggleSideNav() {
    this.isNavOpen = !this.isNavOpen;
    const sideNav = document.querySelector('.side-nav') as HTMLElement;
    if (this.isNavOpen) {
      sideNav.classList.add('open');
    } else {
      sideNav.classList.remove('open');
    }
  }
}
