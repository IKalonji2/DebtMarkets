import express from 'express';
import { cancelBid, getActiveBids, getCollectorOverview } from '../controllers/collectorDashboardController';
import { validateToken } from '../middlewares/authenticate';
import { placeBid } from '../controllers/auctionsController';
import { createTrade, getRecoveriesData, tokenizeReport, uploadRecoveryReport } from '../controllers/recoveryStmt';
import multer from 'multer';
import { getAllBids, getBidsForCollector } from '../controllers/bidController';
import { getOwnedTokens, getValueTrends } from '../controllers/tokenController';
// import { getActiveAuctionsByCollector } from '../services/auctionService';

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/reports"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  });
const upload = multer({ storage });
  
// Routes
router.get('/overview', validateToken, getCollectorOverview);
router.get('/active-bids', validateToken, getActiveBids);
router.post('/place-bid', validateToken, placeBid);
router.delete('/cancel-bid/:bidId', validateToken, cancelBid);
router.get('/progress', validateToken, getRecoveriesData)

// Get all bids
// router.get('/bids', getAllBids);

// Get bids by collector ID
router.get('/bids',validateToken, getBidsForCollector);

router.get("/tokens", validateToken, getOwnedTokens);
router.get("/trends", validateToken, getValueTrends);

router.post('/update-recovery', validateToken, upload.single('file'), uploadRecoveryReport);

router.post('/tokenize', validateToken, tokenizeReport)

router.post("/create-trade",validateToken, createTrade);


export default router;
