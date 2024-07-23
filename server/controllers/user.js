const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { uploadToCloudinary } = require("../utils/cloudinary");
const path = require("path");

const login = (req, res) => {
  const user = req.userObj; //from middleware
  const cookieOptions = {
    maxAge: 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
  };

  const token = jwt.sign(user, process.env.JWT_SECRET);
  res.status(200).cookie("token", token, cookieOptions).send({ user });
};

const signUp = async (req, res) => {
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
};

const getAllUsers = async (req, res) => {
  const allUsers = await User.find(
    {},
    { name: true, username: true, avatar: true }
  );
  res.status(200).send({ users: allUsers });
};

module.exports = { login, signUp, getAllUsers };
