import { Component, OnInit } from '@angular/core';
import { TraderService } from '../../../services/trader.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
  investments: any[] = [];

  constructor(private traderService: TraderService) {}

  ngOnInit(): void {
    this.traderService.getInvestments().subscribe((data) => {
      this.investments = data;
    });
  }
}
