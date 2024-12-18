import DebtPortfolio from "./src/models/debt-portfolio.model";
import Auction from "./src/models/auction";
import Earnings from "./src/models/earnings";
import Bid from "./src/models/collector/bid";
import Trade from "./src/models/open-trade.model";

async function createDebtPortfolios() {
  return Promise.all([
    DebtPortfolio.create({
      lenderId: 2,
      collectorId: 4,
      portfolioName: "Lender 2 Portfolio",
      description: "Portfolio for lender 2",
      bookValue: 100000,
      status: "onAuction",
      portfolioValue: 120000,
      riskDistribution: JSON.stringify({ 0: 0.4, 1: 0.6 }),
      predictions: JSON.stringify([1, 0, 1, 1, 0]),
      probabilities: JSON.stringify([
        [0.3, 0.7],
        [0.6, 0.4],
        [0.2, 0.8],
        [0.1, 0.9],
        [0.5, 0.5],
      ]),
    }),
    DebtPortfolio.create({
      lenderId: 6,
      portfolioName: "Lender 6 Portfolio",
      description: "Portfolio for lender 6",
      bookValue: 150000,
      status: "onAuction",
      portfolioValue: 180000,
      riskDistribution: JSON.stringify({ 0: 0.5, 1: 0.5 }),
      predictions: JSON.stringify([0, 1, 1, 0, 1]),
      probabilities: JSON.stringify([
        [0.4, 0.6],
        [0.3, 0.7],
        [0.2, 0.8],
        [0.7, 0.3],
        [0.1, 0.9],
      ]),
    }),
    DebtPortfolio.create({
      lenderId: 3,
      portfolioName: "Lender 3 Portfolio",
      description: "Portfolio for lender 3",
      bookValue: 200000,
      status: "pending",
      portfolioValue: 220000,
      riskDistribution: JSON.stringify({ 0: 0.2, 1: 0.8 }),
      predictions: JSON.stringify([1, 1, 0, 1, 0]),
      probabilities: JSON.stringify([
        [0.5, 0.5],
        [0.3, 0.7],
        [0.2, 0.8],
        [0.6, 0.4],
        [0.5, 0.5],
      ]),
    }),
  ]);
}

async function createAuctions(portfolios: any) {
  return Promise.all([
    Auction.create({
      portfolioId: portfolios[0].id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: "active",
    }),
    Auction.create({
      portfolioId: portfolios[1].id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: "active",
    }),
    Auction.create({
      portfolioId: portfolios[2].id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
      status: "pending",
    }),
  ]);
}

async function createBids(auctions: any) {
  return Promise.all([
    Bid.create({ auctionId: auctions[0].id, collectorId: 3, bidAmount: 10000, status: "active" }),
    Bid.create({ auctionId: auctions[0].id, collectorId: 4, bidAmount: 12000, status: "active" }),
    Bid.create({ auctionId: auctions[1].id, collectorId: 5, bidAmount: 15000, status: "active" }),
    Bid.create({ auctionId: auctions[2].id, collectorId: 6, bidAmount: 20000, status: "active" }),
  ]);
}

async function createTrades(auctions: any) {
  return Promise.all([
    Trade.create({
      auctionId: auctions[0].id,
      traderId: 3, // Trade linked to trader with id 3
      tradeAmount: 5000,
      status: "open",
    }),
    Trade.create({
      auctionId: auctions[1].id,
      traderId: 3, // Trade linked to trader with id 3
      tradeAmount: 8000,
      status: "open",
    }),
    Trade.create({
      auctionId: auctions[0].id,
      traderId: 2,
      tradeAmount: 7000,
      status: "open",
    }),
    Trade.create({
      auctionId: auctions[1].id,
      traderId: 4,
      tradeAmount: 6000,
      status: "open",
    }),
  ]);
}

async function finalizeAuctions(auctions: any, bids: any) {
  const updates = [
    {
      auction: auctions[0],
      winningBid: bids[1], // Bid 2 wins
    },
    {
      auction: auctions[1],
      winningBid: bids[2], // Bid 3 wins
    },
    {
      auction: auctions[2],
      winningBid: bids[3], // Bid 4 wins
    },
  ];

  for (const { auction, winningBid } of updates) {
    auction.collectorId = winningBid.collectorId;
    auction.winningBidId = winningBid.id;
    auction.bidAmount = winningBid.bidAmount;
    auction.status = "closed";
    await auction.save();
  }
}

async function createEarnings(portfolios: any) {
  return Promise.all([
    Earnings.create({ portfolioId: portfolios[0].id, amount: 2000, date: new Date() }),
    Earnings.create({ portfolioId: portfolios[1].id, amount: 3000, date: new Date() }),
    Earnings.create({ portfolioId: portfolios[2].id, amount: 4000, date: new Date() }),
  ]);
}

async function seedTestData() {
  try {
    const portfolios = await createDebtPortfolios();
    const auctions = await createAuctions(portfolios);
    const bids = await createBids(auctions);

    await createTrades(auctions); // Add trades
    await finalizeAuctions(auctions, bids);
    await createEarnings(portfolios);

    console.log("Test data seeded successfully!");
  } catch (error) {
    console.error("Error seeding test data:", error);
  }
}

seedTestData();
