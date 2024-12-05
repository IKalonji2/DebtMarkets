import Investment from "../models/investments";

async function seedInvestments() {
  await Investment.bulkCreate([
    {
      userId: 1, // Alice
      loanBundleId: 1, // First loan bundle
      amount: 5000,
    },
    {
      userId: 1, // Alice
      loanBundleId: 2, // Second loan bundle
      amount: 10000,
    },
    {
      userId: 2, // Bob
      loanBundleId: 3, // Third loan bundle
      amount: 15000,
    },
  ]);
  console.log("Investments seeded successfully!");
}

seedInvestments();
