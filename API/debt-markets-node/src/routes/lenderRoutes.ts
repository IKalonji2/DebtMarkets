import express from "express";
import { requireRole, validateToken } from "../middlewares/authenticate";
import { getLenderOverview } from "../controllers/lenderController";
import { evaluateLoanBookRoute, evaluateLoanBookController } from "../controllers/loanBookController";
import { getActiveAuctions, getClosedAuctions, putPortfolioForAuction } from "../controllers/auctionsController";
import { createTokens } from "../controllers/tokenizationController";

const router = express.Router();

router.get("/overview", validateToken, getLenderOverview);
router.post('/evaluate-loan-book',validateToken, evaluateLoanBookRoute, evaluateLoanBookController);
router.get("/auctions-active", validateToken,getActiveAuctions);
router.get("/auctions-closed", validateToken, getClosedAuctions);

router.post("/tokenize", validateToken,createTokens);
router.post("/auction", validateToken, putPortfolioForAuction);


export default router;
