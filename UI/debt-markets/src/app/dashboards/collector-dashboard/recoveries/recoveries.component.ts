import { Component } from '@angular/core';

@Component({
  selector: 'app-recoveries',
  templateUrl: './recoveries.component.html',
  styleUrl: './recoveries.component.css'
})
export class RecoveriesComponent {

  recoveriesData = {
    totalRevenue: 50000,
    recoveriesStatus: 'Positive',
  };
}
