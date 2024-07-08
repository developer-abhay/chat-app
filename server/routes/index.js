const { Router } = require("express");
const {
  hashPassword,
  verifyPassword,
} = require("../middlewares/passwordHashing");
const { User } = require("../db");
const route = Router();

// Login Route
route.post("/login", verifyPassword, (req, res) => {
  const username = req.body.username;
  const user = req.user;
  res.status(200).send({ user });
});

// Sign Up Route
route.post("/signup", hashPassword, (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const bio = req.body.bio;
  const avatar = req.body.avatar;
  const password_hash = req.hashedPassword;

  User.create({
    name,
    username,
    password_hash,
    bio,
    avatar,
  }).then(() => {
    res.status(200).send({ message: "User signed up" });
  });
});

module.exports = { route };
