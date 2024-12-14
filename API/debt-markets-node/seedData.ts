import DebtPortfolio from "./src/models/debtPortfolio";
import Auction from "./src/models/auction";
import Earnings from "./src/models/earnings";

async function seedTestData() {
  try {
    // Create DebtPortfolios
    const portfolio1 = await DebtPortfolio.create({
      lenderId: 2,
      name: "Lender 2 Portfolio",
      description: "Portfolio for lender 2",
      value: 100000,
      status: "onAuction", // Aligning with ENUM values: "pending", "onAuction", "closed"
      portfolioValue: 120000,
      riskDistribution: JSON.stringify({ 0: 0.4, 1: 0.6 }), // Mocked risk distribution
      predictions: JSON.stringify([1, 0, 1, 1, 0]), // Mocked predictions
      probabilities: JSON.stringify([[0.3, 0.7], [0.6, 0.4], [0.2, 0.8], [0.1, 0.9], [0.5, 0.5]]), // Mocked probabilities
    });

    const portfolio2 = await DebtPortfolio.create({
      lenderId: 6,
      name: "Lender 6 Portfolio",
      description: "Portfolio for lender 6",
      value: 150000,
      status: "onAuction",
      portfolioValue: 180000,
      riskDistribution: JSON.stringify({ 0: 0.5, 1: 0.5 }), // Mocked risk distribution
      predictions: JSON.stringify([0, 1, 1, 0, 1]), // Mocked predictions
      probabilities: JSON.stringify([[0.4, 0.6], [0.3, 0.7], [0.2, 0.8], [0.7, 0.3], [0.1, 0.9]]), // Mocked probabilities
    });

    // Create Auctions
    const auction1 = await Auction.create({
      portfolioId: portfolio1.id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Ends in 24 hours
      winningBid: 5000,
    });

    const auction2 = await Auction.create({
      portfolioId: portfolio2.id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Ends in 24 hours
      winningBid: 7500,
    });

    // Create Earnings
    await Earnings.create({
      portfolioId: portfolio1.id,
      amount: 2000,
      date: new Date(),
    });

    await Earnings.create({
      portfolioId: portfolio2.id,
      amount: 3000,
      date: new Date(),
    });

    console.log("Test data seeded successfully!");
  } catch (error) {
    console.error("Error seeding test data:", error);
  }
}

seedTestData();
