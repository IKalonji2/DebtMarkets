import express from "express";
import { requireRole, validateToken } from "../middlewares/authenticate";
import { getLenderOverview } from "../controllers/lenderController";
import { evaluateLoanBookRoute, evaluateLoanBookController } from "../controllers/loanBookController";
import { getActiveAuctions, getClosedAuctions } from "../controllers/auctionsController";

const router = express.Router();

router.get("/overview", validateToken, getLenderOverview);
router.post('/evaluate-loan-book',validateToken, evaluateLoanBookRoute, evaluateLoanBookController);
router.get("/auctions-active", validateToken,getActiveAuctions);
router.get("/auctions-closed", validateToken, getClosedAuctions);

export default router;
