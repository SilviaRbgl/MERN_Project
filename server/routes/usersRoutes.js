import express from "express";
import upload from "../middlewares/multer";
const router = express.Router();

router.post("/uploadimage", upload.single("image"), uploadImage);

export default router;