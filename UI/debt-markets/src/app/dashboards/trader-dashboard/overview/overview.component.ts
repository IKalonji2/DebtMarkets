import { Component, OnInit } from '@angular/core';
import { TraderService, OverviewStats } from '../../../services/trader.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  totalInvestments: number = 0;
  totalEarnings: number = 0;
  riskExposure: string = 'Low'; // Default value

  constructor(private traderService: TraderService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.traderService.getOverviewStats().subscribe((stats: OverviewStats) => {
      this.totalInvestments = stats.totalInvestments;
      this.totalEarnings = stats.totalEarnings || 0;
      this.riskExposure = stats.riskExposure || 'Unknown';
    });
  }
}
