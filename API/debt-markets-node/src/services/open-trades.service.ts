import OpenTrade from '../models/open-trade.model';

class OpenTradesService {
  // Fetch all open loan bundles
  async getAllOpenTrades() {
    return await OpenTrade.findAll({
      where: {
        traderId: null,
      },
    });
  }

  // Fetch all open loan bundles for a specific trader
  async getOpenTradesForTrader(traderId: string) {
    return await OpenTrade.findAll({
      where: {
        traderId: traderId,
      },
    });
  }

  // Fetch a single loan bundle by ID
  async getOpenTradeById(bundleId: string) {
    const bundle = await OpenTrade.findByPk(bundleId);
    if (!bundle) {
      throw new Error('Open loan bundle not found');
    }
    return bundle;
  }
}

export default new OpenTradesService();
