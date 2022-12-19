import express from "express";
import {
  uploadImage,
  register,
  login,
  getProfile,
  addFavourite,
  updateProfile,
} from "../controller/usersController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import multerUpload from "../middlewares/multer.js";
const router = express.Router();

router.post("/uploadimage", jwtAuth, multerUpload.single("image"), uploadImage);
router.post("/register", register);
router.post("/login", login);
router.get("/profile", jwtAuth, getProfile);
router.post("/updateprofile", jwtAuth, updateProfile);
router.patch("/favourites", jwtAuth, addFavourite);

export default router;
