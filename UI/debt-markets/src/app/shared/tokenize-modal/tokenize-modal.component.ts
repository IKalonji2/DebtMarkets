import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tokenize-modal',
  templateUrl: './tokenize-modal.component.html',
})
export class TokenizeModalComponent {
  @Input() totalValue: number = 0;
  @Output() onTokenize = new EventEmitter<{ numTokens: number }>();

  numTokens: number = 0;
  tokenValue: number = 0;

  calculateTokenValue(): void {
    if (this.numTokens > 0) {
      this.tokenValue = this.totalValue / this.numTokens;
    }
  }

  submit(): void {
    this.onTokenize.emit({ numTokens: this.numTokens });
  }
}
