import { Router } from 'express';
import OpenLoanBundlesController from '../controllers/open-trades.controller';

const router = Router();

// Route to fetch all open trades
router.get('/', OpenLoanBundlesController.getAllOpenLoanBundles);

// Route to fetch open trades for a specific trader
router.get('/trader/:traderId', OpenLoanBundlesController.getOpenLoanBundlesForTrader);

// Route to fetch a single trade by ID
router.get('/:id', OpenLoanBundlesController.getLoanBundleById);

export default router;
