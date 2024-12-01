import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { AuctionsViewComponent } from './auctions-view/auctions-view.component';
import { TradingViewComponent } from './trading-view/trading-view.component';
import { AuctionDetailsComponent } from './auction-details/auction-details.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'home',
    component: LandingComponent
  },
  {
    path: 'get-started',
    component: GetStartedComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'auctions',
    component: AuctionsViewComponent
  },
  {
    path: 'auction-details',
    component: AuctionDetailsComponent
  },
  {
    path: 'trading',
    component: TradingViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
