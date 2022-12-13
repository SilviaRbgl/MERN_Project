import express from "express";
import {
  createComment,
  getExpeditionsByLeader,
  gettAllExpeditions,
} from "../controller/expeditionsController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
const router = express.Router();

router.get("/all", gettAllExpeditions);
router.get("/all/:leader", getExpeditionsByLeader);
router.post("/postcomment", jwtAuth, createComment);

export default router;
