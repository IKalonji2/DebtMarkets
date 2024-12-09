import DebtPortfolio from "./src/models/debtPortfolio";
import Auction from "./src/models/auction";

// Add test data to DebtPortfolio table
async function addTestData() {
  try {
    // Create DebtPortfolio records
    const portfolio1 = await DebtPortfolio.create({
      lenderId: 1,
      name: "Portfolio 1",
      description: "This is portfolio 1",
      value: 50000,
      status: "pending",
    });

    const portfolio2 = await DebtPortfolio.create({
      lenderId: 2,
      name: "Portfolio 2",
      description: "This is portfolio 2",
      value: 30000,
      status: "pending",
    });

    // Add Auction for these portfolios
    await Auction.create({
      portfolioId: portfolio1.id,
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 3600000), // 1 hour from now
      highestBid: 1000,
    });

    await Auction.create({
      portfolioId: portfolio2.id,
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 3600000), // 1 hour from now
      highestBid: 500,
    });

    console.log("Test data added successfully!");
  } catch (error) {
    console.error("Error adding test data:", error);
  }
}

addTestData();
