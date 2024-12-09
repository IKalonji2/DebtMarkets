import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { InvestmentsComponent } from './investments/investments.component';
import { OpenTradesComponent } from './open-trades/open-trades.component';
import { OverviewComponent } from './overview/overview.component';
import { TokensComponent } from './tokens/tokens.component';
import { TraderDashboardRoutingModule } from './trader-dashboard-routing.module';
import { TraderDashboardComponent } from './trader-dashboard.component';

@NgModule({
  declarations: [
    TraderDashboardComponent,
    InvestmentsComponent,
    OpenTradesComponent,
    OverviewComponent,
    TokensComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TraderDashboardRoutingModule,
    SharedModule,
  ],
})
export class TraderDashboardModule {}
