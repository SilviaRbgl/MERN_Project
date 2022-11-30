import express from "express";
import { uploadImage, register } from "../controller/usersController.js";
import multerUpload from "../middlewares/multer.js";
const router = express.Router();

router.post("/uploadimage", multerUpload.single("image"), uploadImage);
router.post("/register", register);

export default router;
