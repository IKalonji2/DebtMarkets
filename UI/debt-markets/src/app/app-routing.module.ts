import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './dashboards/landing/landing.component';
import { GetStartedComponent } from './dashboards/get-started/get-started.component';
import { LoginComponent } from './dashboards/login/login.component';
import { AboutComponent } from './dashboards/about/about.component';
import { RegisterComponent } from './dashboards/register/register.component';
import { AuctionsViewComponent } from './dashboards/auctions-view/auctions-view.component';
import { TradingViewComponent } from './dashboards/trading-view/trading-view.component';
import { AuctionDetailsComponent } from './dashboards/auction-details/auction-details.component';
import { TradesDashboardComponent } from './dashboards/trades-dashboard/trades-dashboard.component';
import { LenderDashboardComponent } from './dashboards/lender-dashboard/lender-dashboard.component';
import { CollectionAgentDashboardComponent } from './dashboards/collection-agent-dashboard/collection-agent-dashboard.component';
import { TraderDashboardComponent } from './dashboards/trader-dashboard/trader-dashboard.component';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/home',
  //   pathMatch: 'full'
  // },
  // {
  //   path: '**',
  //   redirectTo: '/home'
  // },
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
  },
  {
    path: 'trades',
    component: TradesDashboardComponent
  },
  {
    path: 'lender-dashboard',
    component: LenderDashboardComponent,
    canActivate: [RoleGuard],
    data: { role: 'lender' }
  },
  { path: 'collection-agent-dashboard',
    component: CollectionAgentDashboardComponent,
    canActivate: [RoleGuard],
    data: { role: 'collection-agent' }
  },
  { path: 'trader-dashboard',
    component: TraderDashboardComponent,
    canActivate: [RoleGuard],
    data: { role: 'trader' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
