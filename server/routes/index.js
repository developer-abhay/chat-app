const { Router } = require("express");
const { signupMiddleware, loginMiddleware } = require("../middlewares/index");
const { User } = require("../db");
const route = Router();

// Login Route
route.post("/login", loginMiddleware, (req, res) => {
  const user = req.userObj; //from middleware
  res.status(200).send({ user });
});

// Sign Up Route
route.post("/signup", signupMiddleware, (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const bio = req.body.bio;
  const avatar = req.body.avatar;
  const password_hash = req.hashedPassword; //from middleware

  User.create({
    name,
    username,
    password_hash,
    bio,
    avatar,
  }).then((user) => {
    res.status(200).send({
      user: {
        name: user.name,
        username: user.username,
        bio: user.bio,
        avatar: user.avatar,
      },
    });
  });
});

module.exports = { route };
