import express from "express";
import { uploadImage, register, login } from "../controller/usersController.js";
import multerUpload from "../middlewares/multer.js";
const router = express.Router();

router.post("/uploadimage", multerUpload.single("image"), uploadImage);
router.post("/register", register);
router.post("/login", login);

export default router;
