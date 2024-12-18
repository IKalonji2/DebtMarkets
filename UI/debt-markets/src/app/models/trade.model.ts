export interface Trade {
    bundleId: string;
    collectionAgent: string;
    totalValue: number;
    riskLevel: 'low' | 'medium' | 'high';
    performanceStatus: 'good' | 'neutral' | 'bad';
    loansCount: number;
    lastUpdated: string; // ISO 8601 date string
  }
  