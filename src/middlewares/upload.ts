import multer from "multer";
import path from "path";

export default multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "..", "..", "public", "uploads", "posts"));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now().toString() + "_" + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const extensionImgs = ["image/png", "image/jpg", "image/jpeg"].find(
      (formatAccept) => formatAccept === file.mimetype
    );

    if (extensionImgs) {
      return cb(null, true);
    }

    return cb(null, false);
  },
});
