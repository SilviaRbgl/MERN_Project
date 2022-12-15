import express from "express";
import {
  uploadImage,
  register,
  login,
  getProfile,
  addFavourite,
  getFavouritesByUser,
} from "../controller/usersController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import multerUpload from "../middlewares/multer.js";
const router = express.Router();

router.post("/uploadimage", multerUpload.single("image"), uploadImage);
router.post("/register", register);
router.post("/login", login);
router.get("/profile", jwtAuth, getProfile);
router.get("/favourites/:user", jwtAuth, getFavouritesByUser);
router.patch("/favourites", jwtAuth, addFavourite);

export default router;
