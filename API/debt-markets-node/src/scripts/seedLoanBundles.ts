import LoanBundle from "../models/loanBundles";

async function seedLoanBundles() {
  await LoanBundle.bulkCreate([
    {
      collectionAgent: "Charlie",
      totalValue: 50000,
      currentValue: 48000,
      riskLevel: "low",
      performanceStatus: "good",
      loansCount: 10,
    },
    {
      collectionAgent: "Charlie",
      totalValue: 75000,
      currentValue: 60000,
      riskLevel: "medium",
      performanceStatus: "neutral",
      loansCount: 15,
    },
    {
      collectionAgent: "Charlie",
      totalValue: 100000,
      currentValue: 80000,
      riskLevel: "high",
      performanceStatus: "bad",
      loansCount: 20,
    },
  ]);
  console.log("Loan bundles seeded successfully!");
}

seedLoanBundles();
