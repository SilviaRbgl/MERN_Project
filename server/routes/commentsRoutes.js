import express from "express";
import { getAllComments } from "../controller/commentsController.js";
const router = express.Router();

router.get("/all", getAllComments);

export default router;
