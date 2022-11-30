import multer from "multer";
import path from "path";

const multerUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let extension = path.extname(file.originalname);
    if (extension !== ".jpeg" && extension !== ".jpg" && extension !== ".png") {
      cb(new Error("File extension not supported"), false);
      return;
    }
    cb(null, true);
  },
});
console.log("multerUpload >> ", multerUpload);
export default multerUpload;
