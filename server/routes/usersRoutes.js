import express from "express";
import { uploadImage, register, login, getProfile, getFavourites } from "../controller/usersController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import multerUpload from "../middlewares/multer.js";
const router = express.Router();

router.post("/uploadimage", multerUpload.single("image"), uploadImage);
router.post("/register", register);
router.post("/login", login);
router.get("/profile", jwtAuth, getProfile);
router.get("/favourites", jwtAuth, getFavourites);

export default router;
