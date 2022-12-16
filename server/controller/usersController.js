import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/usersModel.js";
import encryptPassword from "../utils/encryptPassword.js";
import isPasswordCorrect from "../utils/isPasswordCorrect.js";
import issueToken from "../utils/jwt.js";

const register = async (req, res) => {
  // console.log("req.body >>", req.body);
  const { email, password, role } = req.body;

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
        // console.log("token>>", token);

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
  const { userName, email, password, profilePicture, role, favourites } =
    req.user;
  console.log("req.user", req.user);

  try {
    const requestedUser = await userModel
      .findOne({
        email: email,
      })
      .populate({ path: "favourites", select: ["island", "country", "images"] })
      .exec();
    console.log("requestedUser", requestedUser);
    res.status(200).json({
      userName: requestedUser.userName,
      email: requestedUser.email,
      role: requestedUser.role,
      profilePicture: requestedUser.profilePicture,
      favourites: requestedUser.favourites,
    });
  } catch (error) {
    console.log("error getting favourites by user >", error);
    res.status(500).json({
      error,
      msg: "problem in the server getting favourites by user",
    });
  }
  // añadir aqui el findOne, populate, blabla
  // console.log("req>>>", req.user);
};

const updateProfile = async (req, res) => {
  const { userName, password } = req.user;
  console.log("reqUserrrrr>>", req.user);

  if (userName) {
    try {
      const updateUsername = await userModel.findOneAndUpdate({
        userName: userName,
        returnOriginal: false,
      });
      res.status(200).json({
        username: updateUsername.userName,
        msg: "username is changed",
      });
    } catch (error) {}
  }
  if (password) {
    try {
      const updatePassword = await userModel.findOneAndUpdate({
        password: password,
      });
      res.status(200).json({
        password: updatePassword.password,
        msg: "password is changed",
      });
    } catch (error) {}
  }
};

const uploadImage = async (req, res) => {
  try {
    // console.log("req.file", req.file.path);
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

const addFavourite = async (req, res) => {
  const { id } = req.user;
  const { favourite } = req.body; // viene del frontend
  // console.log("user in request>>>", req.user);
  // console.log("favorite trip>>>", req.body);

  try {
    const findingUser = await userModel.findById({ _id: id });
    // console.log("findingUser>> ", findingUser);
    if (findingUser.favourites.length === 0) {
      const findingFavourites = await userModel.findByIdAndUpdate(
        { _id: id },
        { $push: { favourites: favourite } },
        {
          returnOriginal: false,
        }
      );
      res.status(201).json({
        msg: "added to favorites",
        user: {
          favourites: findingFavourites.favourites,
          userName: findingFavourites.userName,
          id: findingFavourites._id,
        },
      });
    }
    if (findingUser.favourites.length > 0) {
      if (findingUser.favourites.includes(favourite)) {
        try {
          const findingFavourites = await userModel.findByIdAndUpdate(
            { _id: id },
            { $pull: { favourites: favourite } },
            {
              returnOriginal: false,
            }
          );
          // console.log("findingFavourites >> ", findingFavourites);
          res.status(201).json({
            msg: "removed from favourites",
            user: {
              favourites: findingFavourites.favourites,
              userName: findingFavourites.userName,
              id: findingFavourites._id,
            },
          });
        } catch {
          res.status(500).json({ msg: "error removing favorite" });
        }
      } else {
        try {
          const findingFavourites = await userModel.findByIdAndUpdate(
            { _id: id },
            { $push: { favourites: favourite } },
            {
              returnOriginal: false,
            }
          );
          res.status(201).json({
            msg: "added to favorites",
            user: {
              favourites: findingFavourites.favourites,
              userName: findingFavourites.userName,
              id: findingFavourites._id,
            },
          });
          console.log("findingFavourites >>>", findingFavourites);
        } catch (error) {
          res.status(500).json({ msg: "error adding to favourites" });
        }
      }
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "user clicking in favourites not found" });
  }
};

export {
  uploadImage,
  register,
  login,
  getProfile,
  addFavourite,
  updateProfile,
};
