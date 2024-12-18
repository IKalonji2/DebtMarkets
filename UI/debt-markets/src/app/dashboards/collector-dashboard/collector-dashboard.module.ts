import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CollectorDashboardComponent } from './collector-dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { ActiveBidsComponent } from './active-bids/active-bids.component';
import { RecoveriesComponent } from './recoveries/recoveries.component';
import { CollectorDashboardRoutingModule } from './collector-dashboard-routing.module';
import { BidHistoryComponent } from './bid-history/bid-history.component';

@NgModule({
  declarations: [
    CollectorDashboardComponent,
    OverviewComponent,
    ActiveBidsComponent,
    RecoveriesComponent,
    BidHistoryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CollectorDashboardRoutingModule
  ],
  exports: [
    CollectorDashboardComponent,
  ]
})
export class CollectorDashboardModule {}
