import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/usersModel.js";
import encryptPassword from "../utils/encryptPassword.js";
import isPasswordCorrect from "../utils/isPasswordCorrect.js";
import issueToken from "../utils/jwt.js";
import { validationResult } from "express-validator";
import commentModel from "../models/commentsModel.js";

const register = async (req, res) => {
  // console.log("req.body >>", req.body);
  const { email, password, role } = req.body;

  try {
    const errors = validationResult(req).array();
    // console.log("errosarray>>", errors);

    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }

    if (errors.length === 0) {
      const existingEmail = await userModel.findOne({ email: req.body.email });
      // console.log("existingEmail", existingEmail);
      if (existingEmail) {
        return res.status(400).json({ msg: "Email already in use" });
      }
      if (!existingEmail) {
        const hashedPassword = await encryptPassword(password);
        // console.log("hashedPassword", hashedPassword);

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
            msg: "User registration succesfully",
            user: savedUser,
          });
        } catch (error) {
          console.log("error", error),
            res.status(500).json({
              msg: "User registration error",
              error: error,
            });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong during registration",
      error: error,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const errors = validationResult(req).array();
    // console.log("errosarray>>", errors);

    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }

    if (errors.length === 0) {
      const existingUser = await userModel.findOne({ email: email });
      // console.log("existingUser >>>", existingUser);

      if (!existingUser) {
        res
          .status(401)
          .json({ msg: "user not found with this email, register first?" });
      } else {
        const verified = await isPasswordCorrect(
          password,
          existingUser.password
        );
        // console.log("verified", verified);
        if (!verified) {
          res.status(401).json({ msg: "Wrong password" });
        }
        if (verified) {
          // console.log("verified >>>", verified);
          const token = issueToken(existingUser._id);
          // console.log("token>>", token);

          res.status(200).json({
            msg: "Logged in successfully",
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
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "Log in went wrong" });
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
      _id: requestedUser._id,
    });
  } catch (error) {
    console.log("Error getting favourites by user>>>", error);
    res.status(500).json({
      error,
      msg: "Problem in the server getting favourites by user",
    });
  }
};

const updateProfile = async (req, res) => {
  const { userName, password, id } = req.user;
  const { newUserName, newPassword } = req.body;
  console.log("reqUser for update>>", req.user);

  try {
    if (userName) {
      const existingUserName = await userModel.findOne({ userName: userName });
      console.log("existingUserName>>", existingUserName.userName);
      if (existingUserName) {
        try {
          const updatedUser = await userModel.findByIdAndUpdate(id, {
            userName: newUserName,
          });
          const updatedComments = await commentModel.updateMany(
            { author: userName },
            { $set: { author: newUserName } }
          );
          console.log("updatedComments", updatedComments);
          // console.log("updatedUsername>>>", updatedUser);
          res.status(201).json({
            msg: "Username updated correctly",
            updatedUser: newUserName,
          });
        } catch (error) {
          console.log("error", error);
          res.status(500).json({ msg: "Error updating username" });
        }
      }
    }

    // if (password) {
    //   try {
    //     const hashedPassword = await encryptPassword(newPassword);
    //     const updatedUser = await userModel.findByIdAndUpdate(id, {
    //       password: hashedPassword,
    //     });
    //     // console.log("updatePassword>>>", updatedUser);
    //     res.status(201).json({
    //       msg: "Password updated correctly",
    //       updatedUser: newPassword,
    //     });
    //   } catch (error) {
    //     console.log("error", error);
    //     res.status(500).json({ msg: "Error updating password" });
    //   }
    // }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "Error updating profile info" });
  }
};

const uploadPicProfile = async (req, res) => {
  try {
    // console.log("req.user in controller :>> ", req.user);
    const { user } = req;
    // console.log("req.file", req.file.path);
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "images",
    });
    console.log("uploadResult", uploadResult.url);

    res.status(200).json({
      msg: "image uploaded in cloudinary",
      imageUrl: uploadResult.url,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      msg: "image uploaded went wrong in cloudinary",
      error: error,
    });
  }
};

const editPicProfile = async (req, res) => {
  const { id } = req.user;
  const { imageUrl } = req.body;
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        profilePicture: imageUrl,
      },
      { new: true }
    );
    res.status(200).json({
      msg: "image updated",
      updatedUser: updatedUser.profilePicture,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      msg: "image uploaded went wrong",
      error: error,
    });
  }
};

// const editPicProfile = async (req, res) => {
//   // write code to update image field
//   const { id } = req.user;
//   const { profilePicture } = req.body;
//   console.log("user in request>>>", req.user);
//   console.log("profilePic in request>>>", req.body);

//   try {
//     // console.log("req.user for editPicProfile :>> ", req.user);
//     const findingPic = await userModel.findOneAndUpdate({
//       profilePicture: profilePicture,
//     });
//     res.status(201).json({
//       msg: "profile picture changed",
//       profilePicture: {
//         imageUrl: findingPic.url,
//       },
//     });
//     console.log("findingPic editPicProfile", findingPic);
//   } catch (error) {
//     console.log("error", error);
//     res.status(500).json({ msg: "problem editing profile picture" });
//   }
// };

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
  uploadPicProfile,
  register,
  login,
  getProfile,
  addFavourite,
  updateProfile,
  editPicProfile,
};
