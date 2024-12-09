import { Component, OnInit } from '@angular/core';
import { TraderService } from '../../../services/trader.service';

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit {
  tokens: any[] = [];

  constructor(private traderService: TraderService) {}

  ngOnInit(): void {
    this.traderService.getTokens().subscribe((data) => {
      this.tokens = data;
    });
  }
}
