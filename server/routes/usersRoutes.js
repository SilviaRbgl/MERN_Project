import express from "express";
import {
  register,
  login,
  getProfile,
  addFavourite,
  uploadPicProfile,
  editPicProfile,
  updateProfile,
} from "../controller/usersController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import multerUpload from "../middlewares/multer.js";
import { body } from "express-validator";
const router = express.Router();

const validation = [
  body("email").not().isEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6, max: 12 })
    .withMessage("Invalid password"),
  // body("role").isEmpty()("Role is required"), //debería meter el role aquí?
];

router.post("/register", validation, register);
router.post("/login", validation, login);
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
