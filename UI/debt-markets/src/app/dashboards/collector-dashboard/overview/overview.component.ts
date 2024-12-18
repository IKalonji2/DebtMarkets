import { Component, OnInit } from '@angular/core';
import { CollectorDashboardService } from '../../../services/collector-dashboard.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  performanceMetrics: { title: string; value: string }[] = [];
  quickLinks = [
    { label: 'View Active Bids', route: '/collector-dashboard/active-bids' },
    { label: 'Track Recoveries', route: '/collector-dashboard/recoveries' },
    { label: 'View Tokens', route: '/collector-dashboard/tokens' }
  ];
  updates: { title: string; message: string; timestamp: Date }[] = [];

  constructor(private dashboardService: CollectorDashboardService) {}

  ngOnInit(): void {
    this.loadPerformanceMetrics();
    // this.loadUpdates();
  }

  loadPerformanceMetrics(): void {
    this.dashboardService.getPerformanceMetrics().subscribe((response: any) => {
      // Extract metrics from the response object
      this.performanceMetrics = [
        { title: 'Active Bids', value: response.activeBids.length.toString() },
        { title: 'Total Recoveries', value: response.totalRecoveries.toString() },
        { title: 'Tokens Owned', value: response.tokensOwned.length.toString() },
      ];
      console.log(this.performanceMetrics);
    });
  }
  

  // loadUpdates(): void {
  //   this.dashboardService.getUpdates().subscribe(updates => {
  //     this.updates = updates;
  //   });
  // }

  navigateTo(route: string): void {
    // Use Angular Router to navigate to specific routes
    // Implement router logic here
  }
}
