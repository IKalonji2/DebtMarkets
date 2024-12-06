import { Component, OnInit } from '@angular/core';
import { LenderDashboardAPIService } from '../../../services/lender-dashboard.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit {
  stats: any = {};

  constructor(private dashboardService: LenderDashboardAPIService) {}

  ngOnInit(): void {
    this.dashboardService.getOverviewStats("").subscribe((data) => {
      this.stats = data;
    });
  }

}
