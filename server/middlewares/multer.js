const multer = require("multer");

// Avatar upload middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Math.floor(Math.random() * 1000000));
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
