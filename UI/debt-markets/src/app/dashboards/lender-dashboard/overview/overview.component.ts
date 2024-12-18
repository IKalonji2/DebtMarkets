import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalService } from '../../../services/modal.service';  // Import ModalService
import { LenderDashboardAPIService } from '../../../services/lender-dashboard.service';
import { TokenizeModalComponent } from '../../../shared/tokenize-modal/tokenize-modal.component'; 
import { TokenizeService } from '../../../services/tokenize.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  portfolios: any[] = [];
  overview: any = null;
  loading: boolean = false;
  errorMessage: string = '';
  earnings: any;

  constructor(
    private lenderService: LenderDashboardAPIService,
    private tokenizeService: TokenizeService,
    private toastr: ToastrService,
    // private modalService: ModalService ,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.fetchOverview();
    this.fetchEarnings();
  }

  private loadPortfolios(): void {
    this.lenderService.getPortfolios().subscribe(
      (data) => {
        this.portfolios = data;
        console.log(this.portfolios);
      },
      (error) => {
        this.errorMessage = 'Error fetching portfolios.';
        console.error('Error fetching portfolios:', error);
      }
    );
  }

  fetchOverview(): void {
    this.loading = true;
    this.lenderService.fetchOverview().subscribe(
      (data) => {
        console.log('Received overview data:', data);
        this.loading = false;
        this.overview = data;
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching overview', error);
        this.errorMessage = 'Error fetching overview data';
      }
    );
  }

  fetchEarnings(): void {
    this.lenderService.getEarnings().subscribe(
      (data) => {
        this.earnings = data;
      },
      (error) => {
        console.error('Error fetching earnings:', error);
      }
    );
  }

  openTokenizeModal(documentId: number, totalValue: number): void {
    
    const modalRef = this.modalService.open(TokenizeModalComponent);
    modalRef.componentInstance.totalValue = totalValue;

    modalRef.componentInstance.onTokenize.subscribe(({ numTokens }: { numTokens: number }) => {
      this.tokenizeService.tokenizeDocument(documentId, 'loanbook',totalValue, numTokens).subscribe(response => {
        console.log('Tokenization Successful:', response);
      });
    });
  }

  onAuction(portfolioId: string): void {
    this.lenderService.putUpForAuction(portfolioId).subscribe({
      next: () => {
        this.toastr.success('Portfolio is now up for auction.');
        this.loadPortfolios();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to put portfolio up for auction.');
      },
    });
  }
}
