import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { CookieService } from "ngx-cookie-service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { TradingChartComponent } from "./components/trading-chart/trading-chart.component";
import { AboutComponent } from "./dashboards/about/about.component";
import { AuctionDetailsComponent } from "./dashboards/auction-details/auction-details.component";
import { AuctionsViewComponent } from "./dashboards/auctions-view/auctions-view.component";
import { GetStartedComponent } from "./dashboards/get-started/get-started.component";
import { LandingComponent } from "./dashboards/landing/landing.component";
import { LenderDashboardComponent } from "./dashboards/lender-dashboard/lender-dashboard.component";
import { LoginComponent } from "./dashboards/login/login.component";
import { RegisterComponent } from "./dashboards/register/register.component";
import { TradesDashboardComponent } from "./dashboards/trades-dashboard/trades-dashboard.component";
import { TradingViewComponent } from "./dashboards/trading-view/trading-view.component";
import { AuthAPIService } from "./services/auth-service/auth-api.service";
import { LenderDashboardModule } from "./dashboards/lender-dashboard/lender-dashboard.module";
import { TraderDashboardModule } from "./dashboards/trader-dashboard/trader-dashboard.module"; // Ensure this module is imported
import { CollectorDashboardModule } from "./dashboards/collection-agent-dashboard/collector-dashboard.module"; // Ensure this module is imported

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LandingComponent,
    GetStartedComponent,
    LoginComponent,
    AboutComponent,
    AuctionsViewComponent,
    TradingViewComponent,
    SideNavComponent,
    RegisterComponent,
    AuctionDetailsComponent,
    TradingChartComponent,
    TradesDashboardComponent,
    LenderDashboardComponent, // Keep this, as it's part of the app module
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    LenderDashboardModule, 
    TraderDashboardModule,
    CollectorDashboardModule,
  ],
  providers: [AuthAPIService, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
