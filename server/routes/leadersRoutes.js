import express from "express";
import { getAllLeaders } from "../controller/leadersController.js";

const router = express.Router();

router.get("/all", getAllLeaders)

export default router;