import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TradeSelectionService {
  private selectedTradeSubject = new BehaviorSubject<any | null>(null);
  selectedTrade$ = this.selectedTradeSubject.asObservable();

  setSelectedTrade(trade: any): void {
    this.selectedTradeSubject.next(trade);
  }
}
