import express from "express";
import { requireRole, validateToken } from "../middlewares/authenticate";
import { getEarnings, createEarning } from "../controllers/earningsController";

const router = express.Router();

router.get("/", validateToken, getEarnings);

router.post("/", validateToken, createEarning);

export default router;
