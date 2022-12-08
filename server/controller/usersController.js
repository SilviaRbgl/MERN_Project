import { v2 as cloudinary } from "cloudinary";
import expeditionModel from "../models/expeditionsModel.js";
import userModel from "../models/usersModel.js";
import encryptPassword from "../utils/encryptPassword.js";
import isPasswordCorrect from "../utils/isPasswordCorrect.js";
import issueToken from "../utils/jwt.js";

const uploadImage = async (req, res) => {
  try {
    console.log("req.file", req.file.path);
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "images",
    });
    console.log("uploadResult", uploadResult);
    res.status(200).json({
      msg: "image uploaded successfully",
      image: uploadResult.url,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      msg: "image uploaded went wrong",
      error: error,
    });
  }
};

const register = async (req, res) => {
  console.log("req.body >>", req.body);
  const { email, password, role } = req.body;

  // const isEmailValid = validateEmail(email)

  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    console.log("existingUser", existingUser);

    if (existingUser) {
      res.status(200).json({ msg: "email already in use" });
    } else {
      const hashedPassword = await encryptPassword(password);
      console.log("hashedPassword", hashedPassword);

      const newUser = new userModel({
        userName: req.body.userName ? req.body.userName : req.body.email,
        email: email,
        password: hashedPassword,
        role: role,
        profilePicture: req.body.image
          ? req.body.image
          : "http://res.cloudinary.com/dtwbyjspa/image/upload/v1669821358/images/yk4xc69svkglrejjq3tk.png",
      });
      try {
        const savedUser = await newUser.save();

        res.status(201).json({
          msg: "user registration succesfully",
          user: savedUser,
        });
      } catch (error) {
        console.log("error", error),
          res.status(500).json({
            msg: "user registration error",
            error: error,
          });
      }
    }
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong during registration",
      error: error,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });
    console.log("existingUser >>>", existingUser);

    if (!existingUser) {
      res
        .status(401)
        .json({ msg: "user not found with this email, register first?" });
    } else {
      const verified = await isPasswordCorrect(password, existingUser.password);
      // console.log("verified", verified);
      if (!verified) {
        res.status(401).json({ msg: "wrong password" });
      }
      if (verified) {
        console.log("verified >>>", verified);
        const token = issueToken(existingUser._id);
        console.log("token>>", token);

        res.status(200).json({
          msg: "logged in successfully",
          user: {
            userName: existingUser.userName,
            id: existingUser._id,
            email: existingUser.email,
            profilePicture: existingUser.profilePicture,
          },
          token,
        });
      }
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "login went wrong" });
  }
};

const getProfile = async (req, res) => {
  const { userName, email, password, profilePicture, role } = req.user;

  // console.log("req>>>", req.user);
  res.status(200).json({
    userName: userName,
    email: email,
    password: password,
    role: role,
    profilePicture: profilePicture,
  });
};

const addFavourite = async (req, res) => {
  const { id } = req.user;
  const { favourite } = req.body;
  console.log("user in request>>>", req.user);
  console.log("favorite trip>>>", req.body);

  try {
    const favoritingUser = await userModel.findById({ _id: id });
    console.log("favoritingUser :>> ", favoritingUser);
    if (favoritingUser.favourites.length === 0) {
      const requestedFavourites = await userModel.findByIdAndUpdate(
        { _id: id },
        { $push: { favourites: favourite } },
        {
          returnOriginal: false,
        }
      );
      res.status(201).json({
        msg: "added to favorites",
        requestedFavourites,
      });
    }
    if (favoritingUser.favourites.length > 0) {
      favoritingUser.favourites.forEach(async (favouriteTrip) => {
        if (favouriteTrip === favourite) {
          console.log("is inside array :>> ", favouriteTrip);
          try {
            const requestedFavourites = await userModel.findByIdAndUpdate(
              { _id: id },
              { $pull: { favourites: favourite } },
              {
                returnOriginal: false,
              }
            );
            // console.log("requestedFavourites :>> ", requestedFavourites);
            res.status(201).json({
              msg: "removed from favourites",
              requestedFavourites,
            });
          } catch {
            res.status(500).json({ msg: "error removing favorite" });
          }
        } else {
          try {
            const requestedFavourites = await userModel.findByIdAndUpdate(
              { _id: id },
              { $push: { favourites: favourite } },
              {
                returnOriginal: false,
              }
            );
            res.status(201).json({
              msg: "added to favorites",
              requestedFavourites,
            });
            console.log("requestedFavourites >>>", requestedFavourites);
          } catch (error) {
            res.status(500).json({ msg: "error adding to favourites" });
          }
        }
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "user clicking in favorutes not found" });
  }
};

export { uploadImage, register, login, getProfile, addFavourite };
