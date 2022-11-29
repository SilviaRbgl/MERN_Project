import express from "express";
import { uploadImage } from "../controller/usersController.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.post("/uploadimage", upload.single("image"), uploadImage);

export default router;