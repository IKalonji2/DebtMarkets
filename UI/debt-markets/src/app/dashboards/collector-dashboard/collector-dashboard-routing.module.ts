import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OverviewComponent } from "./overview/overview.component";
import { CollectorDashboardComponent } from "./collector-dashboard.component";
import { PerformanceComponent } from "./performance/performance.component";
import { ActiveBidsComponent } from "./active-bids/active-bids.component";
import { TokensComponent } from "./tokens/tokens.component";


const routes: Routes = [
  {
    path: '',
    component: CollectorDashboardComponent,
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'performance', component: PerformanceComponent },
      { path: 'active-bids', component: ActiveBidsComponent },
      { path: 'tokens', component: TokensComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectorDashboardRoutingModule {}
