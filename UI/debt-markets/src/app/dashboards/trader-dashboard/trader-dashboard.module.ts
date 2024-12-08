import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TraderDashboardComponent } from "./trader-dashboard.component";

@NgModule({
  declarations: [TraderDashboardComponent],
  imports: [CommonModule],
  exports: [TraderDashboardComponent], // Export if needed in other modules
})
export class TraderDashboardModule {}
