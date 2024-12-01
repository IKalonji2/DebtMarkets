import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
// import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { AuctionsViewComponent } from './auctions-view/auctions-view.component';
import { TradingViewComponent } from './trading-view/trading-view.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RegisterComponent } from './register/register.component';
import { ReusableFormComponent } from './reusable-form/reusable-form.component';
import { AuctionDetailsComponent } from './auction-details/auction-details.component';
import { TradingChartComponent } from './trading-chart/trading-chart.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
