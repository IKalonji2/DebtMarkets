import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OverviewComponent } from "./overview/overview.component";
import { SubmitPortfolioComponent } from "./submit-portfolio/submit-portfolio.component";
import { ClosedAuctionsComponent } from "./closed-auctions/closed-auctions.component";

const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'submit-npl', component: SubmitPortfolioComponent },
  { path: 'closed', component: ClosedAuctionsComponent },
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LenderDashboardRoutingModule { }
