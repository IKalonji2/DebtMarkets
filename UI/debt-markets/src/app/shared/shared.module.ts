import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  // Ensure this import is here
import { SideNavComponent } from '../components/side-nav/side-nav.component';
import { TradingChartComponent } from '../components/trading-chart/trading-chart.component';
import { ReusableFormComponent } from '../components/reusable-form/reusable-form.component';
import { TokenizeModalComponent } from './tokenize-modal/tokenize-modal.component';

@NgModule({
  declarations: [
    SideNavComponent,
    TradingChartComponent,
    ReusableFormComponent,
    TokenizeModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule 
  ],
  exports: [
    SideNavComponent,
    TradingChartComponent,
    ReusableFormComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule 
  ],
})
export class SharedModule {}
