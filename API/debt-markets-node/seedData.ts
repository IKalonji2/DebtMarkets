import DebtPortfolio from "./src/models/debtPortfolio";
import Auction from "./src/models/auction";
import Earnings from "./src/models/earnings"; // Assuming the Earnings model exists

// Add test data to DebtPortfolio table
async function addTestData() {
  try {
    // Create DebtPortfolio records for lenders 2 and 6
    const portfolio1 = await DebtPortfolio.create({
      lenderId: 2,
      name: "Portfolio 2",
      description: "This is portfolio 2 for lender 2",
      value: 30000,
      status: "pending",
    });

    const portfolio2 = await DebtPortfolio.create({
      lenderId: 6,
      name: "Portfolio 6",
      description: "This is portfolio 6 for lender 6",
      value: 70000,
      status: "pending",
    });

    // Add Auction for these portfolios
    const auction1 = await Auction.create({
      portfolioId: portfolio1.id,
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 3600000), // 1 hour from now
      highestBid: 1000,
    });

    const auction2 = await Auction.create({
      portfolioId: portfolio2.id,
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 3600000), // 1 hour from now
      highestBid: 2000,
    });

    // Add Earnings for lenders 2 and 6
    await Earnings.create({
      lenderId: 2,
      // amount: auction1.highestBid, // Earnings based on the highest bid of the auction
      portfolioId: portfolio1.id,
      date: new Date(),
    });

    await Earnings.create({
      lenderId: 6,
      // amount: auction2.highestBid, // Earnings based on the highest bid of the auction
      portfolioId: portfolio2.id,
      date: new Date(),
    });

    console.log("Test data added successfully!");
  } catch (error) {
    console.error("Error adding test data:", error);
  }
}

addTestData();
