import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/usersModel.js";

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
    res.status(500).json({
      msg: "image uploaded went wrong",
      error: error,
    });
  }
};

const register = async (req, res) => {
  console.log("req.body >>", req.body);
  const { email, password } = req.body;

  try {
    const existingUser = userModel.findOne({email: email})

    if(existingUser) {
      res.status(200).json({msg: "email already in use"})
    } else {
      
    }
  } catch (error) {
    res.status(500).json({
      msg: "registration error",
      error: error
    }) 
  }
}

export { uploadImage, register };
