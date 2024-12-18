import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CollectorDashboardService } from '../../../services/collector-dashboard.service';
import { TokenizeService } from '../../../services/tokenize.service';
import { ModalService } from '../../../services/modal.service';
import { TokenizeModalComponent } from '../../../shared/tokenize-modal/tokenize-modal.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-recoveries',
  templateUrl: './recoveries.component.html',
  styleUrls: ['./recoveries.component.css'],
})
export class RecoveriesComponent implements OnInit {
  recoveriesData: any[] = [];
  selectedFile: File | null = null;
  amountRecovered: number = 0;
  portfolioId: string = '';

  constructor(
    private recoveryService: CollectorDashboardService,
    private tokenizeService: TokenizeService,
    // private modalService: ModalService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.fetchRecoveriesData();
  }

  fetchRecoveriesData(): void {
    this.recoveryService.getRecoveriesData().subscribe(
      (data: any) => {
        this.recoveriesData = data;
      },
      (error: any) => {
        console.error('Error fetching recoveries data', error);
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Open the Tokenize Modal
  openTokenizeModal(documentId: number, totalValue: number): void {
    const modalRef = this.modalService.open(TokenizeModalComponent);
    modalRef.componentInstance.totalValue = totalValue;

    modalRef.componentInstance.onTokenize.subscribe(({ numTokens }: { numTokens: number }) => {
      // Tokenize logic for recovery
      this.tokenizeService.tokenizeDocument(documentId,  'recovery', totalValue, numTokens).subscribe(response => {
        console.log('Tokenization Successful:', response);
      });
    });
  }

  submitRecoveryForm(): void {
    if (this.selectedFile && this.amountRecovered > 0 && this.portfolioId != '') {
      this.recoveryService.uploadRecoveryReport(this.selectedFile, this.amountRecovered, this.portfolioId).subscribe(
        (uploadResponse) => {
          console.log('Recovery report uploaded successfully:', uploadResponse);

          this.recoveryService.tokenizeReport(this.portfolioId).subscribe(
            (tokenizeResponse) => {
              console.log('Report tokenized successfully:', tokenizeResponse);

              const tradeData = {
                portfolioId: this.portfolioId,
                amount: this.amountRecovered,
                price: this.amountRecovered * 0.8,
              };

              console.log(formatDate);
              

              console.log('File:', this.selectedFile);
              console.log('Amount Recovered:', this.amountRecovered);
              console.log('Portfolio ID:', this.portfolioId);

              this.recoveryService.createTrade(tradeData).subscribe(
                (createTradeResponse) => {
                  console.log('Trade created successfully:', createTradeResponse);
                  this.fetchRecoveriesData();
                },
                (error) => {
                  console.error('Error creating trade:', error);
                }
              );
            },
            (error) => {
              console.error('Error tokenizing report:', error);
            }
          );
        },
        (error) => {
          console.error('Error uploading recovery report:', error);
        }
      );
    } else {
      console.error('Please provide all necessary data: file, amount recovered, and portfolio ID.');
    }
  }
}
