import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OverviewComponent } from "./overview/overview.component";
import { TokensComponent } from "./tokens/tokens.component";
import { InvestmentsComponent } from "./investments/investments.component";
import { TraderDashboardComponent } from "./trader-dashboard.component";
import { OpenTradesComponent } from "./open-trades/open-trades.component";

const routes: Routes = [
  {
    path: '',
    component: TraderDashboardComponent,
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'tokens', component: TokensComponent },
      { path: 'investments', component: InvestmentsComponent },
      { path: 'open-trades', component: OpenTradesComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TraderDashboardRoutingModule {}