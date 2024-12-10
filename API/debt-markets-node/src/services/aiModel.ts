export const evaluatePortfolioValue = (portfolioData: any[]) => {
    // Mock AI logic to evaluate portfolio value based on the data
    return portfolioData.reduce((total, item) => total + parseFloat(item.amount), 0);
  };
  
  export const getClientRating = (portfolioData: any[]) => {
    // Mock AI logic to calculate client rating
    return portfolioData.length > 0 ? 'Good' : 'Poor';
  };
  