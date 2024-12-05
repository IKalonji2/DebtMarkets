import express from "express";
import LoanBundleController from "../controllers/loanBundlesController";
import InvestmentController from "../controllers/investmentsController";

const router = express.Router();

router.get("/loan-bundles/open", LoanBundleController.getOpenLoanBundles);
router.get("/loan-bundles/:id", LoanBundleController.getLoanBundleDetails);
router.put("/loan-bundles/:id/performance", LoanBundleController.updatePerformance);

router.post("/loan-bundles/:id/invest", InvestmentController.invest);

export default router;
