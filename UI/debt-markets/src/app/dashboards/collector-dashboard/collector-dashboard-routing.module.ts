import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OverviewComponent } from "./overview/overview.component";
import { CollectorDashboardComponent } from "./collector-dashboard.component";
import { RecoveriesComponent } from "./recoveries/recoveries.component";
import { ActiveBidsComponent } from "./active-bids/active-bids.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { MyPortfolioComponent } from "./my-portfolio/my-portfolio.component";
import { BidHistoryComponent } from "./bid-history/bid-history.component";


const routes: Routes = [
  {
    path: '',
    component: CollectorDashboardComponent,
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'recoveries', component: RecoveriesComponent },
      { path: 'active-bids', component: ActiveBidsComponent },
      { path: 'my-portfolio', component: MyPortfolioComponent },
      { path: 'notifications',component: NotificationsComponent},
      { path: 'bid-history', component: BidHistoryComponent},
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectorDashboardRoutingModule {}
