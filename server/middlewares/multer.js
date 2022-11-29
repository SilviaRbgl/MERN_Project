import multer from "multer";
import path from "path";

const upload = multer({ 
    
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {

        let extension = path.extname(file.originalname);
        if (extension !== ".jpeg" && extension !== ".jpg" && extension !== ".png") {
            cb(new Error("File extension not supported"), false);
            return
        }
        // To accept the file pass `true`, like so:
        cb(null, true)
   
      }
})
console.log('upload :>> ', upload);
export default upload;
 
 