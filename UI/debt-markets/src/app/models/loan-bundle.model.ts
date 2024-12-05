export interface LoanBundle {
  bundleId: string;
  collectionAgent: string;  // Name or ID of the collection agent
  totalValue: number;       // Total value of the loan bundle (sum of all loan values)
  currentValue: number;     // Current value based on payments or defaults
  riskLevel: 'high' | 'medium' | 'low';  // Risk level of the bundle
  performanceStatus: 'good' | 'bad' | 'neutral'; // Performance of the bundle
  loansCount: number;       // Number of loans in this bundle
  lastUpdated: string;      // Timestamp of the last update (for real-time updates)
}
