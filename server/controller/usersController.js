import { v2 as cloudinary } from "cloudinary";

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

export { uploadImage };
