import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OverviewComponent } from "./overview/overview.component";
import { SubmitPortfolioComponent } from "./submit-portfolio/submit-portfolio.component";
import { ClosedAuctionsComponent } from "./closed-auctions/closed-auctions.component";
import { LenderDashboardComponent } from "./lender-dashboard.component";
import { OnAuctionComponent } from "./on-auction/on-auction.component";

const routes: Routes = [
  {
    path: '',
    component: LenderDashboardComponent,
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'submit-portfolio', component: SubmitPortfolioComponent },
      { path: 'on-auction', component: OnAuctionComponent },
      { path: 'closed', component: ClosedAuctionsComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LenderDashboardRoutingModule {}

