const { Router } = require("express");
const {
  signupMiddleware,
  loginMiddleware,
  upload,
} = require("../middlewares/index");
const path = require("path");
const { User, Request } = require("../db");
const route = Router();
const { uploadToCloudinary } = require("../utils/cloudinary");
const { resolveSoa } = require("dns");

// Get all Users
route.get("/", async (req, res) => {
  const allUsers = await User.find(
    {},
    { name: true, username: true, avatar: true }
  );
  res.status(200).send({ users: allUsers });
});

// Login Route
route.post("/login", loginMiddleware, (req, res) => {
  const user = req.userObj; //from middleware
  res.status(200).send({ user });
});

// Sign Up Route
route.post(
  "/signup",
  upload.single("avatar"),
  signupMiddleware,
  async (req, res) => {
    const { name, username, bio } = req.body;
    const password_hash = req.hashedPassword;
    let avatar;

    if (req.file) {
      const avatarPath = path.join(__dirname, "..", req.file.path);
      avatar = await uploadToCloudinary(avatarPath);
    }

    try {
      const user = await User.create({
        name,
        username,
        password_hash,
        bio,
        avatar,
      });

      res.status(200).send({
        user: {
          name: user.name,
          username: user.username,
          bio: user.bio,
          avatar: user.avatar,
        },
      });
    } catch (err) {
      res.status(500).send({
        error: "An error occurred while creating the user.",
      });
    }
  }
);

// Send Request
route.post("/request", async (req, res) => {
  const { senderId, receiverId } = req.body;
  await Request.create({
    senderId,
    receiverId,
  });
  res.status(200).json({ message: "Request send" });
});

module.exports = { route };
