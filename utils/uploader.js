const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname , ".." ,"public" , "books" , "covers"));
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + Math.random();
    const ext = path.extname(file.originalname);

    const validMimeTypes = ["image/jpg", "image/jpeg" , "image/png"]

    if (validMimeTypes.includes(file.mimetype)) {
        cb(null, `${fileName}${ext}`);
    } else {
        cb(new Error("Only .jpg | .jpeg | .png"));
    }
  },
});

const maxSize = 3 * 1000 * 1000;

const uploader = multer({
  storage: storage,
  limits: {
    fileSize: maxSize,
  },
});

module.exports = uploader;