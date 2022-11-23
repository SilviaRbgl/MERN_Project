import express from "express";
import {
  getExpeditionsByLeader,
  gettAllExpeditions,
} from "../controller/expeditionsController.js";
const router = express.Router();

// router.get("/all", gettAllExpeditions);
router.get("/all/:leader", getExpeditionsByLeader);

export default router;
