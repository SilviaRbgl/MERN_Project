import express from "express";
import { uploadImage } from "../controller/usersController.js";
import multerUpload from "../middlewares/multer.js";
const router = express.Router();

router.post("/uploadimage", multerUpload.single("image"), uploadImage);

export default router;
