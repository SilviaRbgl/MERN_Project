import express from "express";
// import { gettAllExpeditions } from "../controller/expeditionsController.js";
import { getAllComments } from "../controller/commentsController.js";
const router = express.Router();

router.get("/all", getAllComments);

export default router;
