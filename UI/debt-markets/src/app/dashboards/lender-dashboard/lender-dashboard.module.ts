import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReusableFormComponent } from "../../components/reusable-form/reusable-form.component";
import { ClosedAuctionsComponent } from "./closed-auctions/closed-auctions.component";
import { LenderDashboardRoutingModule } from "./lender-dashboard-routing.module";
import { OnAuctionComponent } from "./on-auction/on-auction.component";
import { OverviewComponent } from "./overview/overview.component";
import { SubmitPortfolioComponent } from "./submit-portfolio/submit-portfolio.component";

@NgModule({
  declarations: [
    ClosedAuctionsComponent,
    OnAuctionComponent,
    SubmitPortfolioComponent,
    OverviewComponent,
    ReusableFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LenderDashboardRoutingModule,
    ReactiveFormsModule
  ],
  exports: [ReusableFormComponent]
})
export class LenderDashboardModule {}
