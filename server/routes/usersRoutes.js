import express from "express";
import {
  register,
  login,
  getProfile,
  addFavourite,
  updateProfile,
  uploadPicProfile,
  editPicProfile,
} from "../controller/usersController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import multerUpload from "../middlewares/multer.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", jwtAuth, getProfile);
router.post("/updateprofile", jwtAuth, updateProfile);
router.patch("/favourites", jwtAuth, addFavourite);
router.post(
  "/uploadimage",
  jwtAuth,
  multerUpload.single("image"),
  uploadPicProfile
);
router.post("/editimage", jwtAuth, editPicProfile);

export default router;
