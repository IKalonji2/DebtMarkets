import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OpenLoanBundlesService } from '../../services/open-loan-bundles.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { Chart, ChartConfiguration } from 'chart.js';
import { Trade } from '../../models/trade.model';

@Component({
  selector: 'app-trading-chart',
  templateUrl: './trading-chart.component.html',
  styleUrls: ['./trading-chart.component.css']
})
export class TradingChartComponent implements OnInit {

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  trade: any = null;
  performanceData: any[] = [];
  traderBalance: number = 0;
  isTraderRegistered: boolean = false; 

  constructor(
    private route: ActivatedRoute,
    private openLoanBundlesService: OpenLoanBundlesService,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    const bundleId = this.route.snapshot.paramMap.get('bundleId')!;
    this.openLoanBundlesService.getLoanBundleById(bundleId).subscribe((data) => {
      this.trade = data;
      this.fetchPerformanceData(bundleId);
    });

    this.authService.getTraderDetails().subscribe((data:any) => {
      this.isTraderRegistered = data.isTraderRegistered; 
    });

    this.authService.getTraderBalance().subscribe((balance:any) => {
      this.traderBalance = balance;
    });
  }

  fetchPerformanceData(bundleId: string): void {
    this.openLoanBundlesService.getLoanBundleById(bundleId).subscribe((data: Trade[]) => {
      this.performanceData = data;
      console.log(this.performanceData)
      this.renderChart();
    });
  }

  renderChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx && this.performanceData.length > 0) {
      const labels = this.performanceData.map((data) => data.date);
      const profitOrLossData = this.performanceData.map((data) => data.profitOrLoss);
      const collectionRateData = this.performanceData.map((data) => data.collectionRate);

      const chartConfig: ChartConfiguration = {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              type: 'line',
              label: 'Profit/Loss ($)',
              data: profitOrLossData,
              borderColor: 'rgba(75, 192, 192, 1)',
              yAxisID: 'y1',
            },
            {
              type: 'line',
              label: 'Collection Rate (%)',
              data: collectionRateData,
              borderColor: 'rgba(255, 159, 64, 1)',
              yAxisID: 'y2',
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
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
                text: 'Collection Rate (%)',
              },
              grid: {
                drawOnChartArea: false,
              },
            },
          },
        },
      };

      new Chart(ctx, chartConfig);
    }
  }

  isBuyButtonDisabled(): boolean {
    return this.traderBalance <= 0 || !this.isTraderRegistered;
  }
}
