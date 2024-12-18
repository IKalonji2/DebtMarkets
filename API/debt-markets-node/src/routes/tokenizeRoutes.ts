import express from "express";
import { validateToken } from "../middlewares/authenticate";
import { tokenizeDocument } from "../controllers/tokenizationController";

const router = express.Router();

router.post("/tokenize", validateToken, tokenizeDocument);

export default router;