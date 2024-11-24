import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
