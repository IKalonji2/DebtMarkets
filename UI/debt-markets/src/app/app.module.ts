import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './dashboards/about/about.component';
import { AuctionDetailsComponent } from './dashboards/auction-details/auction-details.component';
import { AuctionsViewComponent } from './dashboards/auctions-view/auctions-view.component';
import { GetStartedComponent } from './dashboards/get-started/get-started.component';
import { LandingComponent } from './dashboards/landing/landing.component';
import { LenderDashboardComponent } from './dashboards/lender-dashboard/lender-dashboard.component';
import { LenderDashboardModule } from './dashboards/lender-dashboard/lender-dashboard.module';
import { LoginComponent } from './dashboards/login/login.component';
import { RegisterComponent } from './dashboards/register/register.component';
import { TraderDashboardModule } from './dashboards/trader-dashboard/trader-dashboard.module';
import { TradesDashboardComponent } from './dashboards/trades-dashboard/trades-dashboard.component';
import { TradingViewComponent } from './dashboards/trading-view/trading-view.component';
import { AuthAPIService } from './services/auth-service/auth-api.service';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { CollectorDashboardComponent } from './dashboards/collector-dashboard/collector-dashboard.component';
import { CollectorDashboardModule } from './dashboards/collector-dashboard/collector-dashboard.module';

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
    RegisterComponent,
    AuctionDetailsComponent,
    TradesDashboardComponent,
    LenderDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule, // Import SharedModule here
    LenderDashboardModule,
    TraderDashboardModule,
    CollectorDashboardModule,
    RouterModule
  ],
  providers: [AuthAPIService, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
