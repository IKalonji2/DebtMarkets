import { Component } from '@angular/core';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrl: './performance.component.css'
})
export class PerformanceComponent {

  performanceData = {
    totalRevenue: 50000,
    performanceStatus: 'Positive',
  };
}
