// src/app/models/collector.models.ts

export interface Recovery {
    id: number;
    portfolioId: number;
    amountRecovered: number;
    recoveryDate: string;
    details: string; // Add any other details that might be included in the response
  }
  
  export interface Token {
    tokenId: number;
    portfolioId: number;
    value: number;
    dateCreated: string; // Add any other fields relevant to the token
  }
  
  export interface Bid {
    bidId: string;
    portfolioId: string;
    bidAmount: number;
    amount: number;
    status: string; // Adjust according to the status values
    bidDate: string; // Add any other fields related to the bid
  }
  