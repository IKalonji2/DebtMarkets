import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CollectorDashboardComponent } from './collector-dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { ActiveBidsComponent } from './active-bids/active-bids.component';
import { PerformanceComponent } from './performance/performance.component';
import { CollectorDashboardRoutingModule } from './collector-dashboard-routing.module';

@NgModule({
  declarations: [
    CollectorDashboardComponent,
    OverviewComponent,
    ActiveBidsComponent,
    PerformanceComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CollectorDashboardRoutingModule
  ],
})
export class CollectorDashboardModule {}