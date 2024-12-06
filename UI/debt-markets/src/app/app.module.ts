import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
// import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './dashboards/landing/landing.component';
import { GetStartedComponent } from './dashboards/get-started/get-started.component';
import { LoginComponent } from './dashboards/login/login.component';
import { AboutComponent } from './dashboards/about/about.component';
import { AuctionsViewComponent } from './dashboards/auctions-view/auctions-view.component';
import { TradingViewComponent } from './dashboards/trading-view/trading-view.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RegisterComponent } from './dashboards/register/register.component';
import { ReusableFormComponent } from './components/reusable-form/reusable-form.component';
import { AuctionDetailsComponent } from './dashboards/auction-details/auction-details.component';
import { TradingChartComponent } from './components/trading-chart/trading-chart.component';
import { TradesDashboardComponent } from './dashboards/trades-dashboard/trades-dashboard.component';
import { LenderDashboardComponent } from './dashboards/lender-dashboard/lender-dashboard.component';
import { CollectionAgentDashboardComponent } from './dashboards/collection-agent-dashboard/collection-agent-dashboard.component';
import { TraderDashboardComponent } from './dashboards/trader-dashboard/trader-dashboard.component';
import { AuthAPIService } from './services/auth-service/auth-api.service';
import { OverviewComponent } from './dashboards/lender-dashboard/overview/overview.component';
import { SubmitPortfolioComponent } from './dashboards/lender-dashboard/submit-portfolio/submit-portfolio.component';
import { OnAuctionComponent } from './dashboards/lender-dashboard/on-auction/on-auction.component';
import { ClosedAuctionsComponent } from './dashboards/lender-dashboard/closed-auctions/closed-auctions.component';

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
    ReusableFormComponent,
    AuctionDetailsComponent,
    TradingChartComponent,
    TradesDashboardComponent,
    LenderDashboardComponent,
    CollectionAgentDashboardComponent,
    TraderDashboardComponent,
    OverviewComponent,
    SubmitPortfolioComponent,
    OnAuctionComponent,
    ClosedAuctionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
    // NgChartsModule
  ],
  providers: [AuthAPIService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
